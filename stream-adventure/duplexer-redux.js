const duplexer2 = require("duplexer2");
const { Writable } = require('stream')

const map = new Map();

module.exports = function (counter) {  
    const myWritable = new Writable({  
        objectMode: true,
        write(chunk, encoding, callback) {
            const entry = map.has(chunk.country) ? map.get(chunk.country) : 0; 
            map.set(chunk.country, entry + 1);
            callback()
        },
        final(callback) {
            const data = [...map.entries()]
                .reduce((acc, [key, value]) => {
                    acc[key] = value;
                    return acc;
                }, {});

            counter.setCounts(data);
            callback();
        }  
    })
    
    return duplexer2({objectMode: true}, myWritable, counter); 
}