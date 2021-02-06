process.on('uncaughtException', (error, origin) => {
    console.log('uncaught-exception', error, origin);
});

setTimeout(() => {
    throw new Error('Test');
}, 10);