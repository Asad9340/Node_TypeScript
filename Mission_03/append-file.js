const fs = require('fs');

fs.writeFileSync('./output/app.log', 'Application Started.\n');
console.log('file created');

const logEntry1 = `${new Date().toISOString()} - user logged in.\n`;

fs.appendFileSync('./output/app.log', logEntry1);

const logEntry2 = `${new Date().toISOString()} - user performed action A.\n`;
fs.appendFileSync('./output/app.log', logEntry2);