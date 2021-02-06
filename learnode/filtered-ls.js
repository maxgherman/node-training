const fs = require('fs').promises;
const path = require('path');

const [, , dir, extension] = process.argv;
const fullExtension = `.${extension}`;

fs.readdir(dir, { withFileTypes: true})
.then(files => {
    files.forEach(file => {
        if(!file.isDirectory() &&
            path.extname(file.name) === fullExtension) {
            console.log(file.name)
        }
    })
})