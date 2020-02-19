const { urls, pollingInterval } = require('../config')
const { stdin } = process

const { formatOutput } = require('./formatters')
const { executeAndSetTimer, noop, emptyChain } = require('./utils')
const writeOutput = console.log

const oneShot = (urls, getPulls, beforeRender = noop) =>
  Promise.all(urls.map(getPulls))
    .then(formatOutput)
    .then(output => {
      beforeRender()
      writeOutput(output)
    })

const handleKeypress = key => {
  switch (key) {
    case '\u0003':
    case '\u0004':
      process.exit()
      break
    default:
      console.log(key)
      break
  }
}

const displayMessage = () => console.log(`ctrl+c or ctrl+d to exit...\n`)
const showUsage = () => emptyChain(console.clear, displayMessage)
const watch = (urls, getPulls) =>
  emptyChain(
    () => stdin.resume(),
    () => stdin.setEncoding('utf-8'),
    () => stdin.setRawMode(true),
    () => stdin.on('data', handleKeypress),
    () => executeAndSetTimer(() => oneShot(urls, getPulls, showUsage), pollingInterval * 1000)
  )

module.exports = { oneShot, watch }
