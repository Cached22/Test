const dotenv = require('dotenv');
dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  db: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost/legalmate',
  },
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  encryptionKey: process.env.ENCRYPTION_KEY || 'your_encryption_key',
  legalResearchApiKey: process.env.LEGAL_RESEARCH_API_KEY || 'your_legal_research_api_key',
};

module.exports = config;