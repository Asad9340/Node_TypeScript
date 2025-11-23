const os = require('os');

console.log('System info \n');
console.log('-'.repeat(50));

console.log('\n Platform Details : \n');
console.log(`Platform: ${os.platform()}`);
console.log(`OS type: ${os.type()}`);
console.log(`Architecture: ${os.arch()}`);
console.log(`OS Release: ${os.hostname()}`)

console.log('\n CPU Details : \n');
const cpus = os.cpus();

console.log(`CPU Model: ${cpus[0].model}`);
console.log(`Number of Cores: ${cpus.length}`);
console.log(`CPU Speed: ${cpus[0].speed} MHz`);
console.log(`Total Memory: ${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB`);
console.log(`Free Memory: ${(os.freemem() / (1024 ** 3)).toFixed(2)} GB`);
console.log(`Uptime: ${(os.uptime() / 3600).toFixed(2)} Hours`);

console.log('-'.repeat(50));