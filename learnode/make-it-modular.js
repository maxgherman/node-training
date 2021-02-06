const dirModule = require('./mymodule');

const [, , dir, extension] = process.argv;

dirModule(dir, extension, function (error, data) {
    if(error) {
        return console.error('There was an error:', err)
    } else {
        data.forEach(item => console.log(item));
    }
});