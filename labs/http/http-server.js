const http = require('http');
const fs = require('fs');
const { Readable, Transform, pipeline } = require('stream');
const util = require('util');

const pipePromise = util.promisify(pipeline);
let server;

if(process.argv[2] === 'file') {
    server = http.createServer((_, response) => {
        response.writeHead(200, { 'content-type': 'text/plain' });
        fs.createReadStream(__filename)
        .pipe(response);

        response.on('error', console.log);
    });
}

if(process.argv[2] === 'json') {
    const createTransform = () => {
        let suffix = '\n';

        const result = new Transform({
            writableObjectMode: true,
            readableObjectMode: false,
            transform(entry, encoding, next) {
                if(entry == '[') {
                    next(null, `${entry}`);
                    return;    
                }
                
                next(null, `${suffix}"${entry}"`);
                suffix = ',\n';
            },
            final() {
                this.push('\n]');
                this.push(null);
            }
        });

        result.write('[');
        return result;
    };
    
    server = http.createServer((_, response) => {
        response.writeHead(200, { 'content-type': 'application/json' });
        pipePromise(
            Readable.from(fs.readdirSync(__dirname)),
            createTransform(),
            response)
        .catch(console.log);

        response.on('error', console.log);
    });
}

if(process.argv[2] === 'tick') {
    server = http.createServer((_, response) => {
        response.writeHead(200, { 'content-type': 'text/plain' });

        let i = 0;
        const readable = new Readable({
            read() {

                
                const interval = setInterval(() => {
                    const k = i;
                    if(k >= 10) {
                        clearInterval(interval);
                        this.push(null);
                        return;
                    }

                    this.push(Buffer.from(`${k}-tick `));
                    i = k + 1;
                }, 100);
            }
        });
        
        pipePromise(readable, response)
        .catch(console.log);

        response.on('error', console.log);
    });
}

if(process.argv[2] === 'time-json') {
    server = http.createServer((_, response) => {
        response.writeHead(200, { 'content-type': 'application/json' });
        
        const time = new Date();
        response.end(JSON.stringify({
            time: time.toTimeString(),
            date: time.toDateString(),
            utc: time.toUTCString(),
            iso: time.toISOString()
        }));

        response.on('error', console.log);
    });

}

server.on('error', console.log);
server.listen(5000);
