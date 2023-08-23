const { google } = require('googleapis');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');

const oAuth2Client = new google.auth.OAuth2(
  config.googleOAuth2Client.clientId,
  config.googleOAuth2Client.clientSecret,
  config.googleOAuth2Client.redirectUri
);

function getGoogleAuthUrl() {
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ];

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });

  return authUrl;
}

async function getGoogleUserDetails(code) {
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: 'v2', auth: oAuth2Client });
    const userInfo = await oauth2.userinfo.get();

    return userInfo.data;
  } catch (err) {
    throw new Error('Failed to fetch Google user details.');
  }
}

async function googleOAuthCallback(req, res) {
  const { code } = req.query;

  try {
    const userDetails = await getGoogleUserDetails(code);

    // Check if the user already exists in the database based on Google ID
    User.findOne({ googleId: userDetails.id }, async (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Internal server error.' });
      }

      if (!user) {
        // User doesn't exist, create a new user with Google ID
        const newUser = new User({
          googleId: userDetails.id,
          name: userDetails.name,
          email: userDetails.email,
          // Add any other fields relevant to your user model
        });

        await newUser.save();
        user = newUser;
      }

      // Generate a JWT token for user authentication
      const token = jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '15d' });

      return res.json({ token });
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to authenticate with Google.' });
  }
}

module.exports = {
  getGoogleAuthUrl,
  googleOAuthCallback,
};
