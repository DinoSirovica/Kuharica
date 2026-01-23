require('dotenv').config();

module.exports = {
  port: 8081,
  pool: {
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'kuharica',
    debug: false
  },
  jwtSecret: process.env.JWT_SECRET || 'super_secret_key_change_in_production',
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }
};
