const { spawn } = require('child_process')
const path = require('path')

const root = path.resolve(__dirname, '..')
const isWin = process.platform === 'win32'

function run(name, command, args, cwd) {
  const child = spawn(command, args, {
    cwd,
    stdio: 'inherit',
    shell: isWin,
    windowsHide: false,
  })

  child.on('error', (error) => {
    console.error(`\n${name} failed to start:`)
    console.error(error.message)
  })

  child.on('exit', (code) => {
    if (code && code !== 0) {
      console.error(`\n${name} exited with code ${code}`)
    }
  })

  return child
}

console.log('Starting Happy Cookiez demo website...')
console.log('API:      http://localhost:4000')
console.log('Website:  http://localhost:3000')
console.log('Press Ctrl+C to stop both.\n')

const api = run('API', 'node', ['src/index.js'], root)
const web = run('Website', 'npm', ['--prefix', 'web', 'run', 'dev'], root)

function shutdown() {
  if (api && !api.killed) api.kill()
  if (web && !web.killed) web.kill()
  process.exit()
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
