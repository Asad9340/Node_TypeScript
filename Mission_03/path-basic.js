const path = require('path');

console.log('Current file Info :');
console.log("Filename: ", __filename);
console.log("Directory: : ", __dirname);

console.log("\n" + "-".repeat(50) + "\n");
const filePath = '/asad/documents/nextLevel.pdf';
console.log('analyzing file path: ', filePath);
console.log('Base name: ', path.basename(filePath));
console.log('Directory name: ', path.dirname(filePath));
console.log('File extension: ', path.extname(filePath));
console.log('File name: ', path.basename(filePath, path.extname(filePath)));

console.log('\n' + '-'.repeat(50) + '\n');

const parsed = path.parse(filePath);
console.log('Parsed object: ', parsed);

console.log('\n' + '-'.repeat(50) + '\n');

console.log('Formatted path: ', path.format(parsed));