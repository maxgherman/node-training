const { spawn } = require('child_process');
const duplexer2 = require("duplexer2");
       
module.exports = function (cmd, args) {  
    const {stdin: writable, stdout: readable } = spawn(cmd, args); 

    return duplexer2(writable, readable);
}