'use strict';
const { 
  scryptSync, 
  randomBytes, 
  timingSafeEqual,
} = require('crypto');

const salt = randomBytes(16).toString('hex');
console.log('salt : '+salt);

function signup(email, password) {
    const hashedPassword = scryptSync(password, salt, 64).toString('hex');

    const user = { email, password: hashedPassword };
  
    users.push(user);

    return user;
}

function login(email, password) {
    const user = users.find(v => v.email === email);
  
    const hashedBuffer = scryptSync(password, salt, 64);
  
    const keyBuffer = Buffer.from(user.password, 'hex');
    const match = timingSafeEqual(hashedBuffer, keyBuffer);
    
    if (match) {
        return 'login success!';
    } else {
        return 'login fail!';
    }
}

const users = [];

const user = signup('foo@bar.com', 'pa$$word');

console.log(user);

const result = login('foo@bar.com', 'pa$$word');
const result2 = login('foo@bar.com', 'password');

console.log(result);
console.log(result2);