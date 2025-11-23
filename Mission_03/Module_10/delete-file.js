const fs = require('fs');

fs.writeFileSync('./output/delete-file.txt', 'This is the first line.\n');
console.log('file created');

if (fs.existsSync('./output/delete-file.txt')) {
  console.log('File exist!!!');
  fs.unlinkSync('./output/delete-file.txt');
  console.log('File deleted successfully.');
} else {
  console.log('File does not exist!!!');
}

// try {
//   fs.unlinkSync('./output/delete-file.txt');
// } catch (error) {
//   console.log('ERROR', error.message);
// }

fs.writeFile(
  './output/delete-file2.txt',
  'Recreating the file after deletion.\n',
  error => {
    if (error) {
      console.error(error.message);
    }
    console.log('File recreated successfully.');
    fs.unlink('./output/delete-file2.txt', error => {
      if (error) {
        console.error(error.message);
      } else {
        console.log('File deleted successfully (async).');
      }
    });
  }
);
