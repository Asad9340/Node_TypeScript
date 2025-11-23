require('dotenv').config();

const config = {
  app: {
    name: process.env.APP_NAME || 'DEFAULT_APP',
    version: process.env.APP_VERSION || '1.0.0',
    port: process.env.PORT || 8000,
    nodeEnv: process.env.NODE_ENV || 'production',
  },
};
console.log(config.app)
module.exports = config;