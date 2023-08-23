module.exports = {
  // MongoDB connection URI
  mongoURI: 'mongodb://localhost:27017/your-database-name',

  // Google OAuth2Client credentials
  googleOAuth2Client: {
    clientId: 'your-google-client-id',
    clientSecret: 'your-google-client-secret',
    redirectUri: 'your-google-oauth-callback-url',
  },

  // JWT secret for token generation and verification
  jwtSecret: 'your-jwt-secret-key',
};
