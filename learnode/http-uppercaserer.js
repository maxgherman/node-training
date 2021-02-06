const http = require('http');
const map = require('through2-map');

const [, , port] = process.argv;

const server = http.createServer((request, response) => {
    if(request.method !== 'POST') {
        response.writeHead(400, 'Wrong request type')
        response.end();
        return;    
    }

    response.writeHead(200, { 'content-type': 'text/plain' })
  
    request.pipe(map((chunk) => 
        chunk.toString().toUpperCase()
    ))
    .pipe(response);
});

server.listen(Number(port));