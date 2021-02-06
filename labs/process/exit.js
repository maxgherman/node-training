process.on('beforeExit', (code) => console.log('Before exit', code));
process.on('exit', (code) => console.log('exit', code));

console.log('process start', process.argv);

if(process.argv[2] === 'throw') {
    throw new Error('Test error');
}

if(process.argv[2] === 'exit') {
    process.exit(1);
}