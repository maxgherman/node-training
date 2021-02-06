process.on('rejectionHandled', (promise) => {
    console.log('rejection-handled', promise);
})

process.on('unhandledRejection', (reason, promise) => {
    console.log('unhandled-rejection', reason, promise);
})

const p = new Promise((_, reject) => {
    reject('test');
})

if(process.argv[2] === 'catch') {
    setTimeout(() => {
        p.catch(console.log);
    }, 100)
}