const axios = require('axios')

const { headers, tee } = require('./utils')
const { pullIsValid } = require('./validations')
const { formatPull, formatUrl } = require('./formatters')

const getPullsFor = token => url =>
  axios
    .get(formatUrl(url), { headers: headers(token) })
    .then(({ data }) =>
      data.filter(pullIsValid).map(pull => console.log(formatPull(pull)))
    )
    .catch(err => console.log(err))

module.exports = { getPullsFor }
