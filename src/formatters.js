const moment = require('moment')

const formatDate = date => moment(date).fromNow()
const formatPull = pull =>
  `${pull.user.login} | ${pull.title} | ${formatDate(pull.created_at)} | ${
    pull.html_url
  }`
const formatUrl = url => `https://api.github.com/repos/${url}/pulls`

module.exports = { formatDate, formatPull, formatUrl }
