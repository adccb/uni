import config from './components/config'

import * as moment from 'moment'
import { blue, green, yellow } from 'chalk'

const { dateDescending, tee } = require('./utils')

export const formatUrl = url => `https://api.github.com/repos/${url}/pulls`
export const formatTitle = title =>
  yellow(
    title
      .split(' ')
      .slice(0, 8)
      .join(' ') + '...'
  )

export const formatPull = pull =>
  `${green(pull.user.login)} (${formatDate(pull.created_at)}) | ${formatTitle(pull.title)}\n  ${pull.html_url}\n`

export const formatOutput = allRepos =>
  allRepos
    .sort(dateDescending)
    .map(formatPull)
    .join('\n')

const findCorrectColor = date =>
  moment(date)
    .fromNow()
    .includes('days')
    ? blue
    : green

export const formatDate = date => findCorrectColor(date)(moment(date).fromNow(true))

export const formatKeybindings = keybindings =>
  Object.keys(keybindings)
    .map(key => `${key}: ${config.keybindings[key]}`)
    .join('\n  ')

export const formatInfoBar = () => {
  console.clear()
  console.log(`ctrl+c or ctrl+d to exit. keybindings:\n  ${formatKeybindings(config.keybindings)}\n`)
}
