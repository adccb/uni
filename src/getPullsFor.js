const axios = require('axios')

const { headers, tee } = require('./utils')
const { isValid } = require('./validations')
const { formatPull, formatUrl } = require('./formatters')

const getPullsFor = token => url =>
  token === ''
    ? console.log('please provide a github api token in config.json.')
    : axios
        .get(formatUrl(url), { headers: headers(token) })
        .then(({ data }) =>
          data.filter(isValid).map(pull => console.log(formatPull(pull)))
        )
        .catch(err => console.log(err))

module.exports = { getPullsFor }
