const fs = require('fs');

const content1 = 'Hello, World!\nThis is a test file.\n Goodbye, World!\n';

try {
  fs.writeFileSync('./output/write-sync.txt', content1);
  console.log('File written successfully.');
} catch (error) {
  console.error(error.message);
}

const content2 = 'Hello, World 2!\n this is content 2';

fs.writeFile('./output/write-async.txt', content2, error => {
  if (error) {
    console.error(error.message);
  }
});
