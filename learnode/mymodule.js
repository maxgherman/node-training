const fs = require('fs');
const path = require('path');

module.exports = function (dir, extension, callback) {
    const fullExtension = `.${extension}`;

    fs.readdir(dir, { withFileTypes: true}, function(err, files) {
        if(err) {
            return callback(error);
        }
        
        const result = files.filter(item =>
            !item.isDirectory() &&
             path.extname(item.name) === fullExtension)
             .map(item => item.name);

        callback(null, result);
    });
}