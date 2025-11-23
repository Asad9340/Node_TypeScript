const crypto = require('crypto');

console.log('\n MD5 Hash: ');
const md5Hash = crypto.createHash('md5').update('password123').digest('hex');
console.log('Input : password123');
console.log(`MD5 Hashed Password  : ${md5Hash}`);

console.log('\n SHA256 Hash: ');
const sha256Hash = crypto.createHash('sha256').update('password123').digest('hex');
console.log('Input : password123');
console.log(`SHA256 Hashed Password  : ${sha256Hash}`);

console.log('\n SHA512 Hash: ');
const sha512Hash = crypto.createHash('sha512').update('password123').digest('hex');
console.log('Input : password123');
console.log(`SHA512 Hashed Password  : ${sha512Hash}`);