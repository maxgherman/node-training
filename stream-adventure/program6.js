const concat = require('concat-stream');

process.stdin
.pipe(concat(function(body) {
    const data = body.toString().split('').reverse().join('');
    process.stdout.write(data);
}));