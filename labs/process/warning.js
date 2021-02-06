process.on('warning', (warning) => {
    console.warn(warning.code);
    console.warn(warning.name);
    console.warn(warning.message);
    console.warn(warning.stack);
});

if(process.argv[2] === '-w') {
    process.emitWarning('Warning message');
}

if(process.argv[2] === '-c') {
    process.emitWarning('Warning message', 'TestWarning');
}

if(process.argv[2] === '-er') {
    const error = new Error('Error message');
    error.name = 'TestError';
    error.code = 'test-code-01';
    process.emitWarning(error);
}

