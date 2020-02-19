const { token = '', urls = [], ...rest } = require('./config')
const { configIsValid } = require('./src/validations')
const { tee } = require('./src/utils')
const { getPullsUsing } = require('./src/getPullsUsing')
const { oneShot, watch } = require('./src/modes')

const getPulls = getPullsUsing(token)
const getFlags = args => process.argv.filter(i => /^\-/.test(i))
const isWatch = flags => flags.includes('--watch') || flags.includes('-w')

configIsValid({ token, urls, ...rest })
  .then(getFlags)
  .then(flags => (isWatch(flags) ? watch() : oneShot(urls, getPulls)))
