const {
    readFileSync,
    createReadStream,
    createWriteStream,
    readdirSync,
    watchFile,
    promises: { readFile, unlink, readdir, stat },
} = require('fs');
const { pipeline, Transform, Readable } = require('stream');
const path = require('path');
const { promisify } = require('util');
const { EventEmitter } = require('events');

const pipelinePromise = promisify(pipeline)

// read file contents

const data = readFileSync(__filename, { encoding: 'utf8' });
console.log(data);

readFile(__filename, { encoding: 'utf8' })
.then(console.log);

// streams

createReadStream(__filename, { encoding: 'utf8' })
.pipe(process.stdout);

const copyFilePath = path.resolve(__dirname, 'index.txt');
const copyFileUppercasePath = path.resolve(__dirname, 'index-uppercase.txt');

pipelinePromise(
    createReadStream(__filename, { encoding: 'utf8' }),
    createWriteStream(copyFilePath)
)
.then(() => unlink(copyFilePath))
.catch(console.log);

const transform = new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
        callback(null, chunk.toUpperCase());
    }
});

pipelinePromise(
    createReadStream(__filename, { encoding: 'utf8' }),
    transform,
    createWriteStream(copyFileUppercasePath)
)
.then(() => unlink(copyFileUppercasePath))
.catch(console.log);


// directories

try {
    readdirSync(__dirname)
    .map(item => console.log(item));
} catch(error) {
    console.log(error);
}

readdir(__dirname)
.then(console.log);


const transformToJSON = () => {

    let suffix = '\n';

    const result = new Transform({
        writableObjectMode: true,
        readableObjectMode: false,
        transform(entry, encoding, next) {
            
            if(entry == '[') {
                next(null, `${entry}`);
                return;    
            }
            
            next(null, `${suffix}"${entry}"`);
            suffix = ',\n';
        },
        final() {
            this.push('\n]\n');
        }
    });

    result.write('[');

    return result;
}

const dirJson = path.resolve(__dirname, 'dir.json');

pipelinePromise(
    Readable.from(readdirSync(__dirname)),
    transformToJSON(),
    createWriteStream(dirJson)
)
.then(() => unlink(dirJson))
.catch(console.log);

// file stats

// atime "Access Time": Time when file data last accessed. Changed by the mknod(2), utimes(2),
// and read(2) system calls.

// mtime "Modified Time": Time when file data last modified. Changed by the mknod(2), utimes(2),
// and write(2) system calls.

// ctime "Change Time": Time when file status was last changed (inode data modification).
// Changed by the chmod(2), chown(2), link(2), mknod(2), rename(2), unlink(2), utimes(2), read(2),
// and write(2) system calls.

// birthtime "Birth Time": Time of file creation. Set once when the file is created.
// On file-systems where birthtime is not available, this field may instead hold either
// the ctime or 1970-01-01T00:00Z (ie, Unix epoch timestamp 0).

readdir(__dirname)
.then(data => Promise.all(
    data.map(item => stat(item))
))
.then(data => {
    data.forEach((item, index) => {
        const { atime, birthtime, ctime, mtime } = item;
        console.group(
            item.isDirectory() ? 'dir' : (item.isFile() ? 'file': 'unknown'),
            data[index]
        );
        console.log('atime:', atime.toLocaleString());
        console.log('ctime:', ctime.toLocaleString());
        console.log('mtime:', mtime.toLocaleString());
        console.log('birthtime:', birthtime.toLocaleString());
        console.groupEnd();
        console.log();
    });
})
.catch(console.log);

// path

console.log('Directory name', path.dirname(__filename));
console.log('Base name', path.basename(__filename));
console.log('Extension name', path.extname(__filename));
console.log('Resolve',  path.resolve(__dirname, 'test','test.txt'));
console.log('Normalize', path.normalize(`${__dirname}/../../test/test.txt`));
console.log('Is Absolute', path.isAbsolute(__filename));

// watching

const fileWatchingEvents = new EventEmitter();

watchFile(path.resolve(__dirname, 'watch-file.txt'), (curr, prev) => {
    try {
        if (curr.ctimeMs !== prev.ctimeMs) {
            fileWatchingEvents.emit('status-updated', {curr, prev });
        }

        if (curr.mtimeMs !== prev.mtimeMs) {
            fileWatchingEvents.emit('content-updated', {curr, prev });
        }

        if (curr.atimeMs !== prev.atimeMs) {
            fileWatchingEvents.emit('access-updated', {curr, prev });
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            fileWatchingEvents.emit('deleted', __filename);
            } else {
            fileWatchingEvents.emit('error', err);
        }
    }
});

fileWatchingEvents.on('access-updated', () => console.log('access-updated'));
fileWatchingEvents.on('content-updated', () => console.log('content-updated'));
fileWatchingEvents.on('status-updated', () => console.log('status-updated'));
fileWatchingEvents.on('deleted', () => console.log('deleted'));
fileWatchingEvents.on('error', () => console.log('error'));
