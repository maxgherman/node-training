
const log = (value) => {
    console.log(value);
}

const base = {
    _log: log,
    log() {
        this._log(this.state);
    }
}

const baseInstance = Object.create(base, {
    state: { value: 'base' }
});

const first = Object.create(baseInstance, {
    log: {
        value() {
            baseInstance.log();
            this._log('first log')
        }
    },
    firstLog: {
        value() {
            this._log('first log');
        }
    }
})

baseInstance.log();
console.log();
first.log();
first.firstLog();

function Test() {
    const data = Object.create(Object.prototype);
    data.name = 'Test';

   return data;
}

const test = new Test();

console.log(test);