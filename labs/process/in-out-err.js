const { Transform } = require('stream')
const { StringDecoder } = require('string_decoder');

const strDecoder = new StringDecoder('utf8');

const toUpperTransform = new Transform({
    transform(chunk, encoding, next) {
        next(null, strDecoder.write(chunk).toUpperCase());
    }
})

process.stdin.pipe(toUpperTransform).pipe(process.stdout);