const http = require('http');
const [, , port] = process.argv;

const parseUrl = (url) => new URL(url, 'http://test');

const handleParseTime = (request, response) => {
    const requestUrl = parseUrl(request.url);

    if(!requestUrl.searchParams.has('iso')) {
        response.writeHead(400, 'Wrong request type')
        response.end();
        return;
    }

    const dateValue = requestUrl.searchParams.get('iso');
    const date = new Date(dateValue);

    const result = JSON.stringify({
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds()
    });

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(result);
}

const handleUnixTime = (request, response) => {
    const requestUrl = parseUrl(request.url);

    if(!requestUrl.searchParams.has('iso')) {
        response.writeHead(400, 'Wrong request type')
        response.end();
        return;
    }

    const dateValue = requestUrl.searchParams.get('iso');
    const date = new Date(dateValue);

    const result = JSON.stringify({
        unixtime: date.getTime(),
    });

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(result);
}

const server = http.createServer((request, response) => {
    if(request.method !== 'GET') {
        response.writeHead(400, 'Wrong request type')
        response.end();
        return;    
    }

    if(/^\/api\/parsetime/i.test(request.url)) {
        handleParseTime(request, response);
        return;
    }

    if(/^\/api\/unixtime/i.test(request.url)) {
        handleUnixTime(request, response);
        return;
    }

    response.writeHead(404, 'Unknown request')
    response.end();
});


server.listen(Number(port));