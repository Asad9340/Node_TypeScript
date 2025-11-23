const fs = require('fs');

console.log('Reading user data synchronously...');

try {
  const data = fs.readFileSync('./data/diary.txt', 'utf-8');
  console.log(data);
} catch (error) {
  console.error(error.message);
}

console.log('Finished')