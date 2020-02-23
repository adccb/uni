const axios = require('axios')

const { headers } = require('./utils')
const { pullIsValid } = require('./validations')
const { formatUrl } = require('./formatters')

const getPullsUsing = token => url =>
  axios
    .get(formatUrl(url), { headers: headers(token) })
    .then(({ data }) => data.filter(pullIsValid))
    .catch(err => console.log(err))

module.exports = { getPullsUsing }
