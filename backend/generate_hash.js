const bcrypt = require('bcrypt');
const password = 'admin123';
const SALT_ROUNDS = 10;

bcrypt.hash(password, SALT_ROUNDS).then(hash => {
    console.log('HASH:' + hash);
});
