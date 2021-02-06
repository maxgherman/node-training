const { EventEmitter } = require('events')

function action() {
    throw new Error('throw');
}

// throw

try {
    action();
} catch(error) {
    console.log(error);
}

// reject

const promise = new Promise(() => {
    throw new Error('reject');
})

promise
.catch(console.log)

// throw within catch

new Promise((_, reject) => reject(new Error('Error within catch')))
.catch(err => { throw err })
.catch(console.log);
    
// emit

const eventEmitter = new EventEmitter();
eventEmitter.on('error', console.log);
eventEmitter.emit('error', new Error('emit'));

// duck typing

const codifyError = (code, error) => {
    error.code = code;
    return error;
}

function action2() {
    const min = 0;
    const max = 5;
    const code = Math.floor(Math.random() * (max - min + 1)) + min;

    const errors = [
        new EvalError(`Test message: ${code}`),
        new SyntaxError(`Test message: ${code}`),
        new RangeError(`Test message: ${code}`),
        new ReferenceError(`Test message: ${code}`),
        new TypeError(`Test message: ${code}`),
        new URIError(`Test message: ${code}`),
    ];

    throw codifyError(code, errors[code]);
}

try {
    action2();

} catch(error) {
    switch(error.code) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            console.log(error);
            break;
        default:
            console.log('Unknown error', error);
    }
}