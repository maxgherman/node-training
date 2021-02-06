const { spawnSync, spawn } = require('child_process')

const result1 = spawnSync(
  process.execPath,
  ['-e', `console.log('subprocess stdio output')`]
)
console.log(result1)

// exception

const result2 = spawnSync(process.execPath, [`-e`, `process.exit(1)`])
console.log(result2)

// close

const sp1 = spawn(
    process.execPath,
    [`-e`, `console.log('subprocess stdio output')`]
)

console.log('pid is', sp1.pid)

sp1.stdout.pipe(process.stdout)

sp1.on('close', (status) => {
    console.log('exit status was', status)
})

const sp2 = spawn(
    process.execPath,
    [`-e`, `process.exit(1)`]
)

console.log('pid is', sp2.pid)

sp2.stdout.pipe(process.stdout)

sp2.on('close', (status) => {
    console.log('exit status was', status)
})
