const { promisify } = require('util');

const f = (value, interval) => (callback) => {
    setTimeout(() => {
        callback(null, value)
    }, interval);
}

const f1 = f('f1', 100);
const f2 = f('f2', 300);
const f3 = f('f3', 500);

const printCallback = (_, value) => console.log(value);

const f1Promise = promisify(f1);
const f2Promise = promisify(f2);
const f3Promise = promisify(f3);

// sequential

f1((_, value) => {
    printCallback(_, value);

    f2((_, value2) => {
        printCallback(_, value2);

        f3((_, value3) => {
            printCallback(_, value3);
        })
    })
})

// sequential promise

f1Promise()
.then((data) => printCallback(null, data))
.then(() => f2Promise())
.then((data) => printCallback(null, data))
.then(() => f3Promise())
.then((data) => printCallback(null, data))
.catch(console.log);

// sequential dynamic promises

[
    f1Promise,
    f2Promise,
    f3Promise
]
.reduce((acc, curr) => {
    acc = acc.then(() => curr())
    .then((data) => printCallback(null, data));
    
    return acc;

}, Promise.resolve())
.catch(console.log);

// parallel

f1(printCallback)
f2(printCallback)
f3(printCallback)

// parallel promise

const promises = [
    f1Promise().then((data) => printCallback(null, data)),
    f2Promise().then((data) => printCallback(null, data)),
    f3Promise().then((data) => printCallback(null, data))
];

Promise.all(promises)
.catch(console.log)