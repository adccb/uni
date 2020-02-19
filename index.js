const { token = '', urls = [], ...rest } = require('./config')
const { getPullsUsing } = require('./src/getPullsUsing')
const { configIsValid } = require('./src/validations')
const { formatOutput } = require('./src/formatters')

const writeOutput = console.log
const getPulls = getPullsUsing(token)

configIsValid({ token, urls, ...rest })
  .then(() => Promise.all(urls.map(getPulls)))
  .then(formatOutput)
  .then(writeOutput)
  .catch(reason => console.log(`your ${reason} config var is off, check the readme`))
