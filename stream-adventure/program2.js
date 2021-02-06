const { Readable } = require('stream')  
    
const [, ,data] = process.argv;

const myStream = new Readable({})  
myStream._read = () => {}

myStream.push(data);
myStream.pipe(process.stdout);