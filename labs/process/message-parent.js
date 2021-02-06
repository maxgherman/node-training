const { fork } = require('child_process');

const childProcess = fork('./message-child');

const data = 'parent data';
console.log('[PARENT]: sending data', `"${data}"`);
childProcess.send({ data});
childProcess.on('message', (message) => {
    console.log('[PARENT]: received message', message);
}) 