import config from './config'

const { urls, pollingInterval, keybindings } = config
const { stdin } = process

import * as publisher from './publisher'
import * as cache from './cache'
import { formatOutput, formatKeybindings, formatInfoBar } from '../formatters'
import { executeAndSetTimer, noop, tee } from '../utils'

const writeOutput = console.log

export const oneShot = async ({ urls, getPulls, beforeRender = noop, filter }) =>
  getPulls()
    .then(cache.persist(new Date().getTime()))
    .then(filter)
    .then(formatOutput)
    .then(output => {
      beforeRender()
      writeOutput(output)
    })

export const isWatch = flags => flags.includes('--watch') || flags.includes('-w')
export const watch = async ({ urls, getPulls, filter, useCache = false }) => {
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

  await oneShot({ urls, getPulls: useCache ? cache.getPulls : getPulls, beforeRender: formatInfoBar, filter })
  return setInterval(
    async () => await oneShot({ urls, getPulls, beforeRender: formatInfoBar, filter }),
    pollingInterval * 1000
  )
}
