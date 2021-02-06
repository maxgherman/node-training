const { createGzip } = require('zlib');
const combine = require('stream-combiner');
const split = require('split2');
const through2 = require('through2');

let prevGenre = null;
let currentGenre = null;

let result = null;

const createResult = (name) => ({
    name,
    books: []
});

const resultToJSONLine = (result) => `${JSON.stringify(result)}\n`;

module.exports = function () {  
    return combine(
        split(),
        through2(function (line, _, next) {
            const lineData = line.toString();
            if(!lineData) {
                return next();
            };

            const data = JSON.parse(lineData);

            if(data.type === 'genre') {
                if(!prevGenre) {
                    prevGenre = data.name;
                    currentGenre = data.name;

                    result = createResult(currentGenre);
                } else {
                    if(currentGenre !== data.name) {
                        prevGenre = currentGenre;
                        currentGenre = data.name;
                      
                        result = createResult(currentGenre);
                        this.push(resultToJSONLine(result));
                    }
                }
            } else { // data.type === book
                result.books.push(data.name);
            }

            next();
        }, function (next) { this.push(resultToJSONLine(result)); next()  }),
        createGzip()

        // read newline-separated json,  
        // group books into genres,  
        // then gzip the output  
    );  
}  