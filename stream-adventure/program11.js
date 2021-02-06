const crypto = require('crypto')  

const [, , passphase, initializationValue] = process.argv

const stream = crypto.createDecipheriv('aes256', passphase, initializationValue);
process.stdin.pipe(stream)
stream.pipe(process.stdout)