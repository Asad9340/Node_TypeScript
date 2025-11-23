const fs = require('fs');

console.log('Reading user data asynchronously...');

fs.readFile('./data/diary.txt', 'utf-8', (err, data) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log(data);
});

console.log('Finished');
