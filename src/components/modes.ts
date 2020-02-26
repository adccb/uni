import config from './config'

const { urls, pollingInterval, keybindings } = config
const { stdin } = process

import * as publisher from './publisher'
import * as cache from './cache'
import { formatOutput, formatKeybindings, formatInfoBar } from '../formatters'
import { executeAndSetTimer, noop, tee } from '../utils'

const writeOutput = console.log

export const isWatch = flags => flags.includes('--watch') || flags.includes('-w')

export const oneShot = ({ urls, getPulls, beforeRender = noop, filter }) =>
  Promise.all(urls.map(async url => cache.persist(url, await getPulls(url))))
    .then(i => i.flat())
    .then(filter)
    .then(formatOutput)
    .then(output => {
      beforeRender()
      writeOutput(output)
    })

export const watch = ({ urls, getPulls, filter, useCache = false }) => {
  stdin.resume()
  stdin.setEncoding('utf-8')
  stdin.setRawMode(true)
  stdin.on('data', key => {
    switch (key.toString()) {
      case '\u0003':
      case '\u0004':
        process.exit()
        break
      default:
        publisher.publish('keypress', key.toString())
        break
    }
  })

  return executeAndSetTimer(
    oneShot,
    // the first time, we check if we're using the cache; if we are, pass it through
    { urls, getPulls: useCache ? cache.getPulls : getPulls, beforeRender: formatInfoBar, filter },
    // when we re-poll, though, we should use the http version to make sure we're recent
    { urls, getPulls, beforeRender: formatInfoBar, filter },
    pollingInterval * 1000
  )
}
