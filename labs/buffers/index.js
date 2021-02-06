const { StringDecoder } = require('string_decoder')

// allocation

console.log('-- allocation --');

const unsafeAlloc = Buffer.allocUnsafe(10);
console.log(unsafeAlloc);

const safeAlloc = Buffer.alloc(10);
console.log(safeAlloc);

// encoding  (string -> Buffer)

console.log('-- encoding --');

const enc1 = Buffer.from('test');
console.log(enc1);

const enc2 = Buffer.from('test', 'utf8');
console.log('utf8', enc2);

const enc3 = Buffer.from('test', 'utf16le');
console.log('utf16le', enc3);

const enc4 = Buffer.from('test', 'latin1');
console.log('latin1', enc4);

const enc5 = Buffer.from('dGVzdA==', 'base64');
console.log('base64', enc5.toString());

const enc6 = Buffer.from('74657374', 'hex');
console.log('hex', enc6, enc6.toString());

// decoding (Buffer -> string)

console.log('-- decoding --');

console.log(enc2.toString());

console.log('base64', enc2.toString('base64'));

console.log('hex', enc2.toString('hex'));

// construction

console.log('-- construction --');

const c1 = Buffer.from([50, 51, 52, 53, 54, 55, 56, 57])
console.log('array', c1, c1.toString());

const c2 = Buffer.from([50, 51, 52, 53, 54, 55, 56, 57], 'ASCII')
console.log('ASCII', c2, c2.toString());

const c3 = Buffer.from(c1)
console.log('buffer', c3.toString());

const c4 = Buffer.from('😐︎')
console.log(c4)
console.log(c4.toString())
console.log(c4 + '')
console.log(c4.length)

// string decoder

console.log('-- string decoder --');

const centPart1 = Buffer.from(['0xC2'])
const centPart2 = Buffer.from(['0xA2'])
console.log(centPart1.toString())
console.log(centPart2.toString())

const decoder = new StringDecoder()
console.log(decoder.write(centPart1))
console.log(decoder.write(centPart2))

// JSON

console.log('-- JSON --');

const cent = Buffer.from(['0xC2', '0xA2']);
const json = JSON.stringify(cent);
const jsonBack = JSON.parse(json);
console.log(json);
console.log(Buffer.from(jsonBack.data))

// slicing

console.log('-- slicing --');

const sl1 = Buffer.from(['0xC2', '0xA2']);
const sl2 = sl1.slice(0, 1);
console.log(sl2);





