const { spawn } = require('child_process')

if(process.argv[2] === 'reuse') {
    process.env.A_VAR_WE = 'JUST SET'

    const sp1 = spawn(process.execPath, ['-p', 'process.env'])
    sp1.stdout.pipe(process.stdout)
}

if(process.argv[2] === 'override') {
    process.env.A_VAR_WE = 'JUST SET'

    const sp2 = spawn(process.execPath, ['-p', 'process.env'], {
      env: {SUBPROCESS_SPECIFIC: 'ENV VAR'}
    })

    sp2.stdout.pipe(process.stdout)
}

// cwd

const { IS_CHILD } = process.env

if (IS_CHILD) {
  console.log('Subprocess cwd:', process.cwd())
  console.log('env', process.env)
} else {
  const { parse } = require('path')
  const { root } = parse(process.cwd())
  const sp3 = spawn(process.execPath, [__filename], {
    cwd: root,
    env: {IS_CHILD: '1'}
  })

  sp3.stdout.pipe(process.stdout)
}


