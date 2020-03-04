import config from './components/config'

import filters, { toFilter } from './filters'
import Github from './getPullsUsing'
import { oneShot as oneShot_, watch as watch_ } from './components/modes'

import * as publisher from './components/publisher'

const { token, urls, keybindings } = config
const { noFilter } = filters

const getPulls = Github.fetchPulls

export const oneShot = async () => {
  await oneShot_({ urls, getPulls, filter: noFilter })
  process.exit()
}

export const watch = async () => {
  let app = await watch_({ urls, getPulls, filter: noFilter })
  publisher.on('keypress', async payload => {
    clearInterval(app)
    app = await watch_({ urls, getPulls, filter: toFilter(payload), useCache: true })
  })
}
