import config from './components/config'

import filters, { toFilter } from './filters'
import getPullsUsing from './getPullsUsing'
import { oneShot, watch, isWatch } from './components/modes'
import * as publisher from './components/publisher'

const { token, urls, keybindings } = config
const { noFilter } = filters

const getPulls = getPullsUsing(token)
const flags = process.argv.filter(i => /^\-/.test(i))

if (!isWatch(flags)) {
  ;(async () => {
    await oneShot({ urls, getPulls, filter: noFilter })
    process.exit()
  })()
}

let app = watch({ urls, getPulls, filter: noFilter })
publisher.on('keypress', payload => {
  clearInterval(app)
  app = watch({ urls, getPulls, filter: toFilter(payload), useCache: true })
})
