const { spawn, spawnSync } = require('child_process');

const sp1 = spawn(
  process.execPath,
  [
   '-e',
   `console.error('err output'); process.stdin.pipe(process.stdout)`
  ],
  { stdio: ['pipe', 'pipe', 'pipe'] }
)

sp1.stdout.pipe(process.stdout)
sp1.stderr.pipe(process.stdout)
sp1.stdin.write('this input will become output\n')
sp1.stdin.end();



const sp2 = spawn(
    process.execPath,
    [
     '-e',
     `console.error('err output'); process.stdin.pipe(process.stdout)`
    ],
    { stdio: ['pipe', 'inherit', 'pipe'] }
)
  
sp2.stderr.pipe(process.stdout)
sp2.stdin.write('this input will become output\n')
sp2.stdin.end();



const sp3 = spawn(
    process.execPath,
    [
     '-e',
     `console.error('err output'); process.stdin.pipe(process.stdout)`
    ],
    { stdio: ['pipe', 'inherit', process.stdout] }
)
  
sp3.stdin.write('this input will become output\n')
sp3.stdin.end();



const sp4 = spawn(
    process.execPath,
    [
     '-e',
     `console.error('err output'); process.stdin.pipe(process.stdout)`
    ],
    { stdio: ['pipe', 'inherit', 'ignore'] }
)
  
sp4.stdin.write('this input will become output\n');
sp4.stdin.end();
  

spawnSync(
    process.execPath,
    [
     '-e',
     `console.error('err output'); process.stdin.pipe(process.stdout)`
    ],
    {
      input: 'this input will become output\n',
      stdio: ['pipe', 'inherit', 'ignore']
    }
);
