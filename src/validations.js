const { teammates = [], blacklist = [] } = require('../config')
const { isArrayOf } = require('./utils')

const notZeroable = false
const isOnTeam = username => teammates.map(i => i.toLowerCase()).includes(username.toLowerCase())
const pullIsValid = pull => isOnTeam(pull.user.login) && !blacklist.includes(pull.number)

const blacklistIsValid = isArrayOf('number')
const teammatesIsValid = isArrayOf('string', notZeroable)
const unteammatesIsValid = isArrayOf('string')
const urlsIsValid = isArrayOf('string', notZeroable)
const tokenIsValid = i => typeof i === 'string'
const pollingIntervalIsValid = i => typeof i === 'number'

const validateConfig = ({ blacklist, teammates, pollingInterval, token, unteammates, urls }) =>
  blacklistIsValid(blacklist)
    ? teammatesIsValid(teammates)
      ? pollingIntervalIsValid(pollingInterval)
        ? unteammatesIsValid(unteammates)
          ? urlsIsValid(urls)
            ? tokenIsValid(token)
              ? 'valid'
              : 'token'
            : 'urls'
          : 'unteammates'
        : 'pollingInterval'
      : 'teammates'
    : 'blacklist'

const configIsValid = config =>
  new Promise((res, rej) => {
    const result = validateConfig(config)
    result === 'valid' ? res(result) : rej(result)
  })

module.exports = { isOnTeam, pullIsValid, configIsValid, isArrayOf }
