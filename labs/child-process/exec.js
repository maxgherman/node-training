const { execSync, exec } = require('child_process')

// node

const output1 = execSync(
  `node -e "console.log('subprocess stdio output')"`
)

console.log(output1.toString())

const output2 = execSync(
    `${process.execPath} -e "console.error('subprocess stdio output')"`
)
console.log(output2.toString())

// platform

const cmd = process.platform === 'win32' ? 'dir' : 'ls'
const output3 = execSync(cmd)
console.log(output3.toString())

// exception

try {
    execSync(`${process.execPath} -e "process.exit(1)"`)
} catch (err) {
    console.error('CAUGHT ERROR:', err)
}

try {
  execSync(`${process.execPath} -e "throw Error('kaboom')"`)
} catch (err) {
  console.error('CAUGHT ERROR:', err)
}
  
exec(
    `${process.execPath} -e "console.log('A');console.error('B')"`,
    (err, stdout, stderr) => {
      console.log('err', err)
      console.log('subprocess stdout: ', stdout.toString())
      console.log('subprocess stderr: ', stderr.toString())
    }
)

exec(
    `${process.execPath} -e "console.log('A'); throw Error('B')"`,
    (err, stdout, stderr) => {
      console.log('err', err)
      console.log('subprocess stdout: ', stdout.toString())
      console.log('subprocess stderr: ', stderr.toString())
    }
)

// close

const sp = exec(
    `${process.execPath} -e "console.log('subprocess stdio output')"`
)

console.log('pid is', sp.pid)

sp.stdout.pipe(process.stdout)

sp.on('close', (status) => {
    console.log('exit status was', status)
})