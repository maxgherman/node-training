const { EventEmitter } = require('events');

// emit error

const emitter = new EventEmitter();

emitter.on('error', (error) => console.log('Error:', error.message));
emitter.emit('error', new Error('data'));

// emit once

emitter.once('data', (x1, x2, x3) => console.log(x1, x2, x3));
emitter.emit('data', 1, 2, 3);

// emit on

emitter.on('on data', (x1) => console.log(x1));

for(let i = 0; i < 3; i++) {
    let k = i;
    setTimeout(() => {
        emitter.emit('on data', k);        
    }, 200);
}

// prepend listener

emitter.on('tick', (tick) => console.log('Original tick:', tick));

setTimeout(() => {
    emitter.emit('tick', 'tick 1');
    emitter.emit('tick', 'tick 2');
    emitter.emit('tick', 'tick 3');
}, 200);

emitter.prependListener('tick', (tick) => console.log('Prepended tick:', tick));

// prepend once listener

emitter.on('tick once', (tick) => console.log('Original tick once:', tick));

setTimeout(() => {
    emitter.emit('tick once', 'tick 1');
    emitter.emit('tick once', 'tick 2');
    emitter.emit('tick once', 'tick 3');
}, 200);

emitter.prependOnceListener('tick once', (tick) => console.log('Prepended tick once:', tick));

// remove listener

emitter.emit('remove');
const onRemoveListener = () => console.log('Remove 1:'); 
emitter.on('remove', onRemoveListener);

setTimeout(() => {
    emitter.removeListener('remove', onRemoveListener);
}, 100);

emitter.emit('remove');

process.stdin.resume()
