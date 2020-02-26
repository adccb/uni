const { token = '', urls = [], keybindings, ...rest } = require('../config')

const { configIsValid } = require('./validations')
const filters = require('./filters')
const { getPullsUsing } = require('./getPullsUsing')
const { oneShot, watch } = require('./modes')
const publisher = require('./publisher')

const getPulls = getPullsUsing(token)
const getFlags = args => process.argv.filter(i => /^\-/.test(i))
const isWatch = flags => flags.includes('--watch') || flags.includes('-w')

const toFilter = key => filters[keybindings[key]]

configIsValid({ token, urls, keybindings, ...rest })
  .catch(reason => console.log(`your ${reason} config var is off, check the readme`))
  .then(getFlags)
  .then(flags => {
    const { noFilter } = filters

    if (!isWatch(flags)) return oneShot({ urls, getPulls, filter: noFilter })
    let app = watch({ urls, getPulls, filter: noFilter })

    publisher.on('keypress', payload => {
      clearInterval(app)
      app = watch({ urls, getPulls, filter: toFilter(payload), useCache: true })
    })
  })
