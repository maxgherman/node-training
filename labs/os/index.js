const os = require('os');

console.log('OS uptime', os.uptime())
console.log('Total system memory', os.totalmem());
console.log('Free memory', os.freemem());

console.log('End of line marker',  Buffer.from(os.EOL).toString('hex'));

// CPU architecture: possible values are 'arm', 'arm64', 'ia32', 'mips', 'mipsel', 'ppc', 'ppc64', 's390',
// 's390x', 'x32', and 'x64'
console.log('CPU architecture', os.arch());

// OS platform: possible values are 'aix', 'darwin', 'freebsd', 'linux', 'openbsd', 'sunos',
// 'win32'.
console.log('Platform', os.platform());

// Operating system name as returned by uname(3)
// 'Linux' on Linux, 'Darwin' on macOS, and 'Windows_NT' on Windows.
console.log('OS type', os.type());

console.log('Logical CPUs', os.cpus());

console.log('OS default temp directory', os.tmpdir());
console.log('OS host name', os.hostname());

console.log('Network interfaces', os.networkInterfaces());

console.log('Current user home directory', os.homedir());
console.log('Currently effective user', os.userInfo());

console.log('OS version', os.version());




