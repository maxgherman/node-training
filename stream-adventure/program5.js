const split2 = require('split2');
const through2 = require('through2');

let index = 0;

const changeCase = (data, index) => ({
    value: `${index % 2 == 0 ? data.toLowerCase() : data.toUpperCase()}\n`,
    next: (index + 1) % 2 
})

process.stdin  
.pipe(split2())  
.pipe(through2(function (line, _, next) {  
    
    const data = changeCase(line.toString(), index);
    index = data.next;

    this.push(data.value);
    next();  
}))
.pipe(process.stdout)