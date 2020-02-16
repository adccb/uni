const { teammates = [], blacklist = [] } = require('../config')
const { tee } = require('./utils')

const notZeroable = false
const isOnTeam = username => teammates.includes(username.toLowerCase())
const pullIsValid = pull => isOnTeam(pull.user.login) && !blacklist.includes(pull.number)

const isArrayOf = (type, zeroable = true) => collection =>
  Array.isArray(collection) && (zeroable || collection.length >= 1) && collection.every(i => typeof i === type)

const blacklistIsValid = isArrayOf('number')
const teammatesIsValid = isArrayOf('string', notZeroable)
const unteammatesIsValid = isArrayOf('string')
const urlsIsValid = isArrayOf('string', notZeroable)
const tokenIsValid = i => typeof i === 'string'

const validate = ({ blacklist, teammates, token, unteammates, urls }) =>
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

const configIsValid = (config, cb) => {
  const obj = validate(config)
  cb && cb(obj)
  return obj
}

module.exports = { isOnTeam, pullIsValid, configIsValid, isArrayOf }
