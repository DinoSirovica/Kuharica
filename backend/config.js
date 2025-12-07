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
    // Google OAuth Configuration
    google: {
      clientId: '674358194368-0areh3ol22h7qpci7hci7aeeoqochotp.apps.googleusercontent.com',
    }
};
