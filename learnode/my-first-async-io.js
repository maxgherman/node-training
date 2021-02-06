const fs = require('fs');
const readline = require('readline');

const fileStream = fs.createReadStream(process.argv[2]);

const reader = readline.createInterface({
    input: fileStream
});

let result = -1;
reader.on('line', () => { result++; });
reader.on('close', () => { console.log(result); });