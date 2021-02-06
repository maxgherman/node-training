const fs = require('fs');
const data = fs.readFileSync(process.argv[2]);
console.log(data.toString().split('\n').length - 1)
