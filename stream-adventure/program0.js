const fs = require('fs');

const [, ,filePath] = process.argv;

fs.createReadStream(filePath).pipe(process.stdout);