const tar = require('tar')  
const crypto = require('crypto')
const concat = require('concat-stream');

const [, , algorithm, key, initializationValue] = process.argv
const cryptoStream = crypto.createDecipheriv(algorithm, key, initializationValue);

const parser = new tar.Parse()
parser.on('entry', function (e) {

    if(e.type !== 'File') {
        return e.resume();
    }
    
    const hash = crypto.createHash('md5', { encoding: 'hex' });
    
    e.pipe(hash)
    .pipe(concat((buffer) => {
        process.stdout.write(`${buffer} ${e.path}\n`)
    }));
});

process.stdin
.pipe(cryptoStream)
.pipe(parser)  