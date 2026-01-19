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
  // Google OAuth Configuration - uses environment variables
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
  },
  jwtSecret: process.env.JWT_SECRET || 'your_super_secret_key_change_in_production'
};
