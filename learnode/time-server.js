const net = require('net');
const strftime = require('strftime');

const [, , port] = process.argv;

const server = net.createServer((socket) => {
    socket.write(strftime('%Y-%m-%d %H:%M'));
    socket.end('\n');
});

server.listen(Number(port));
