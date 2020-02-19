const moment = require('moment')
const { blue, green, yellow } = require('chalk')

const { tee, def, dateDescending } = require('./utils')

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

// prettier-ignore
const findCorrectColor = date =>
  def((
    formattedDate = moment(date).fromNow()) =>
    formattedDate.includes('days') ? blue : green)

// prettier-ignore
const formatDate = date =>
  def((
    displayText = moment(date).fromNow(true),
    color = findCorrectColor(date)) => 
    color(displayText))

module.exports = { formatDate, formatPull, formatUrl, formatOutput }
