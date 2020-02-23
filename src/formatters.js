const moment = require('moment')
const { blue, green, yellow } = require('chalk')

const { dateDescending } = require('./utils')

const formatUrl = url => `https://api.github.com/repos/${url}/pulls`
const formatTitle = title =>
  yellow(
    title
      .split(' ')
      .slice(0, 8)
      .join(' ') + '...'
  )

const formatPull = pull =>
  `${green(pull.user.login)} (${formatDate(pull.created_at)}) | ${formatTitle(pull.title)}\n  ${pull.html_url}\n`

const formatOutput = allRepos =>
  allRepos
    .flat()
    .flat()
    .sort(dateDescending)
    .map(formatPull)
    .join('\n')

const findCorrectColor = date =>
  moment(date)
    .fromNow()
    .includes('days')
    ? blue
    : green

const formatDate = date => findCorrectColor(date)(moment(date).fromNow(true))

module.exports = { formatDate, formatPull, formatUrl, formatOutput }
