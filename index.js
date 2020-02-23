const { token = '', urls = [], ...rest } = require('./config')

const { configIsValid } = require('./src/validations')
const { filters } = require('./src/filters')
const { getPullsUsing } = require('./src/getPullsUsing')
const { oneShot, watch } = require('./src/modes')
const publisher = require('./src/publisher')

const getPulls = getPullsUsing(token)
const getFlags = args => process.argv.filter(i => /^\-/.test(i))
const isWatch = flags => flags.includes('--watch') || flags.includes('-w')

const keybindings = {
  n: filters.noFilter,
  c: filters.clearAll
}

configIsValid({ token, urls, ...rest })
  .catch(reason => console.log(`your ${reason} config var is off, check the readme`))
  .then(getFlags)
  .then(flags => {
    const { noFilter } = filters
    let app

    if (!isWatch(flags)) {
      return oneShot({ urls, getPulls, filter: noFilter })
    }

    publisher.on('keypress', payload => {
      clearInterval(app)
      app = watch({ urls, getPulls, filter: keybindings[payload], useCache: true })
    })

    app = watch({ urls, getPulls, filter: noFilter })
  })
