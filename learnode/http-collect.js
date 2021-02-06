const http = require('http');

const [, , url] = process.argv;

let result = ''

http.get(url, (response) => {
    response.setEncoding('utf8');
    response.on('data', (data) => {
        result += data;
    });

    response.on('end',  () => {
        console.log(result.length);
        console.log(result);
        result = '';
    });

    response.on('error', console.log);
})
.on('error', console.log)