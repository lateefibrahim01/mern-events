const express = require('express');
const { getGoogleAuthUrl, googleOAuthCallback } = require('../controllers/authController');
const router = express.Router();

// Route to get the Google OAuth2Client authentication URL
router.get('/google/auth/url', (req, res) => {
  const authUrl = getGoogleAuthUrl();
  return res.json({ url: authUrl });
});

// Route to handle the Google OAuth2Client callback
router.get('/google/auth/callback', googleOAuthCallback);

module.exports = router;
