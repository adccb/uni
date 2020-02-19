const { token = '', urls = [], ...rest } = require('./config')
const { configIsValid } = require('./src/validations')
const { tee } = require('./src/utils')
const { getPullsUsing } = require('./src/getPullsUsing')
const { oneShot, watch } = require('./src/modes')

const getPulls = getPullsUsing(token)
const getFlags = args => process.argv.filter(i => /^\-/.test(i))
const isWatch = flags => flags.includes('--watch') || flags.includes('-w')

// prettier-ignore
const startApp = flags => isWatch(flags)
  ? watch(urls, getPulls)
  : oneShot(urls, getPulls)

configIsValid({ token, urls, ...rest })
  .catch(reason => console.log(`your ${reason} config var is off, check the readme`))
  .then(getFlags)
  .then(startApp)
