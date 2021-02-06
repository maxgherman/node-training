const http = require('http')  
const through2 = require('through2');

const [, , port] = process.argv;
     
const server = http.createServer(function (req, res) {  
    if (req.method === 'POST') {  
        req
        .pipe(through2(function (buffer, _, next) {  
            this.push(buffer.toString().toUpperCase());
            next();  
        })) 
        .pipe(res);
    } else {
        res.end();
    }  
});  

server.listen(Number(port)) 