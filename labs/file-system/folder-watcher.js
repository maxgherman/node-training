const { join } = require('path')
const fs = require('fs')
const { promisify } = require('util')


const timeout = promisify(setTimeout)
const project = join(__dirname, 'project')

try { fs.rmdirSync(project, {recursive: true}) } catch (err) {
  console.error(err)
}

fs.mkdirSync(project)

async function writer () {
  const { open, chmod, mkdir } = fs.promises
  const pre = join(project, Math.random().toString(36).slice(2))
  const handle = await open(pre, 'w')
  await handle.close()
  await timeout(500)
  const result = await execute(project)
  const file = join(project, Math.random().toString(36).slice(2))
  const dir = join(project, Math.random().toString(36).slice(2))
  const add = await open(file, 'w')
  await add.close()
  await mkdir(dir)
  await chmod(pre, 0o644)
  await timeout(500)

  console.log(result);

  process.exit()
}

writer().catch((err) => {
  console.error(err)
  process.exit(1)
})

const execute = (project) =>
    new Promise((resolve, reject) => {
        const files = new Set(fs.readdirSync(project))
        fs.watch(project, (evt, filename) => {
            try {
                const filepath = join(project, filename)
                const stat = fs.statSync(filepath)

                if(!stat.isDirectory() && !files.has(filename)) {
                    resolve(filepath);
                }
            } catch (err) {
                reject(err);
            }
        })
    });
