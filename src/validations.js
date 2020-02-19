const { teammates = [], blacklist = [] } = require('../config')
const { tee, isArrayOf } = require('./utils')

const notZeroable = false
const isOnTeam = username => teammates.includes(username.toLowerCase())
const pullIsValid = pull => isOnTeam(pull.user.login) && !blacklist.includes(pull.number)

const blacklistIsValid = isArrayOf('number')
const teammatesIsValid = isArrayOf('string', notZeroable)
const unteammatesIsValid = isArrayOf('string')
const urlsIsValid = isArrayOf('string', notZeroable)
const tokenIsValid = i => typeof i === 'string'

const validateConfig = ({ blacklist, teammates, token, unteammates, urls }) =>
  blacklistIsValid(blacklist)
    ? teammatesIsValid(teammates)
      ? unteammatesIsValid(unteammates)
        ? urlsIsValid(urls)
          ? tokenIsValid(token)
            ? 'valid'
            : 'token'
          : 'urls'
        : 'unteammates'
      : 'teammates'
    : 'blacklist'

const configIsValid = config =>
  new Promise((res, rej) => {
    const result = validateConfig(config)
    result === 'valid' ? res(result) : rej(result)
  }).catch(reason => console.log(`your ${reason} config var is off, check the readme`))

module.exports = { isOnTeam, pullIsValid, configIsValid, isArrayOf }
