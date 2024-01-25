const mongoose = require('mongoose');
const config = require('../config');

const database = {};

database.connect = async () => {
  try {
    await mongoose.connect(config.databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

database.disconnect = async () => {
  try {
    await mongoose.disconnect();
    console.log('Database disconnected successfully.');
  } catch (error) {
    console.error('Database disconnection failed:', error);
  }
};

module.exports = database;