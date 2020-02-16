const { token = '', urls = [], ...rest } = require('./config')
const { getPullsFor } = require('./src/getPullsFor')
const { configIsValid } = require('./src/validations')

configIsValid({ token, urls, ...rest })
  .then(() => urls.forEach(getPullsFor(token)))
  .catch(reason => console.log(`your ${reason} config var is off, check the readme`))
