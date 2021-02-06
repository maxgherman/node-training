const http = require('http');
const fs = require('fs');

const [, , port, filePath] = process.argv;

const server = http.createServer((_, response) => {
    response.writeHead(200, { 'content-type': 'text/plain' })
    const stream = fs.createReadStream(filePath);
    stream.pipe(response);
})

server.listen(Number(port));