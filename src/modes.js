const { urls, pollingInterval } = require('../config')
const { stdin } = process

const { formatOutput } = require('./formatters')
const publisher = require('./publisher')
const cache = require('./cache')
const { executeAndSetTimer, noop } = require('./utils')
const writeOutput = console.log

const oneShot = ({ urls, getPulls, beforeRender = noop, filter }) =>
  Promise.all(
    urls.map(async url => {
      const pulls = await getPulls(url)
      cache.persist(url, pulls)
      return pulls
    })
  )
    .then(formatOutput)
    .then(filter)
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
      publisher.publish('keypress', key)
      break
  }
}

const showUsage = () => console.clear() || console.log(`ctrl+c or ctrl+d to exit...\n`)
const prepareStdin = () => {
  stdin.resume()
  stdin.setEncoding('utf-8')
  stdin.setRawMode(true)
  stdin.on('data', handleKeypress)
}

const watch = ({ urls, getPulls, filter, useCache }) => {
  prepareStdin()
  executeAndSetTimer(
    oneShot,
    // the first time, we check if we're using the cache; if we are, pass it through
    { urls, getPulls: useCache ? cache.getPulls : getPulls, beforeRender: showUsage, filter },
    // when we re-poll, though, we should use the http version to make sure we're recent
    { urls, getPulls, beforeRender: showUsage, filter },
    pollingInterval * 1000
  )
}

module.exports = { oneShot, watch }
