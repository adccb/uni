import config from './components/config'

import filters, { toFilter } from './filters'
import Github from './getPullsUsing'
import { oneShot, watch, isWatch } from './components/modes'
import * as publisher from './components/publisher'

const { token, urls, keybindings } = config
const { noFilter } = filters

const getPulls = Github.fetchPulls
const flags = process.argv.filter(i => /^\-/.test(i))

if (!isWatch(flags)) {
  ;(async () => {
    await oneShot({ urls, getPulls, filter: noFilter })
    process.exit()
  })()
}

;(async () => {
  let app = await watch({ urls, getPulls, filter: noFilter })
  publisher.on('keypress', async payload => {
    clearInterval(app)
    app = await watch({ urls, getPulls, filter: toFilter(payload), useCache: true })
  })
})()
