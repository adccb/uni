const { urls, pollingInterval, keybindings } = require('../config')
const { stdin } = process

const { formatOutput, formatKeybindings, formatInfoBar } = require('./formatters')
const publisher = require('./publisher')
const cache = require('./cache')
const { executeAndSetTimer, noop, tee } = require('./utils')
const writeOutput = console.log

const oneShot = ({ urls, getPulls, beforeRender = noop, filter }) =>
  Promise.all(urls.map(async url => cache.persist(url, await getPulls(url))))
    .then(i => i.flat())
    .then(filter)
    .then(formatOutput)
    .then(output => {
      beforeRender()
      writeOutput(output)
    })

const watch = ({ urls, getPulls, filter, useCache }) => {
  stdin.resume()
  stdin.setEncoding('utf-8')
  stdin.setRawMode(true)
  stdin.on('data', key => {
    switch (key) {
      case '\u0003':
      case '\u0004':
        process.exit()
        break
      default:
        publisher.publish('keypress', key)
        break
    }
  })

  executeAndSetTimer(
    oneShot,
    // the first time, we check if we're using the cache; if we are, pass it through
    { urls, getPulls: useCache ? cache.getPulls : getPulls, beforeRender: formatInfoBar, filter },
    // when we re-poll, though, we should use the http version to make sure we're recent
    { urls, getPulls, beforeRender: formatInfoBar, filter },
    pollingInterval * 1000
  )
}

module.exports = { oneShot, watch }
