export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  googleApplicationCredentials: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});
