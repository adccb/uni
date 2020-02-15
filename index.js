const { token = '', urls = [], ...rest } = require('./config')
const { getPullsFor } = require('./src/getPullsFor')
const { configIsValid } = require('./src/validations')

configIsValid({ token, urls, ...rest }, result =>
  result === 'valid'
    ? urls.forEach(getPullsFor(token))
    : console.log(`your ${result} config var is off, check the readme`)
)
