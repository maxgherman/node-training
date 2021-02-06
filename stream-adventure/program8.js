const { request } = require('http');

const req = request('http://localhost:8099', { method: 'POST' }, (res) => {  
    res.pipe(process.stdout);
})

process.stdin.pipe(req);