import { homedir } from 'os'
import { readFileSync } from 'fs'

import { isArrayOf } from '../utils'
import { filterNames } from '../filters'
import { Config } from '../types'

const defaultConfig: Config = {
  blacklist: [],
  keybindings: {},
  teammates: [],
  pollingInterval: 10,
  urls: [],
  token: ''
}

const configFile = `${homedir()}/.config/pulls/config.json`
const fileContents = readFileSync(configFile, 'utf8')
const notZeroable = false

const blacklistIsValid = isArrayOf('number')
const teammatesIsValid = isArrayOf('string', notZeroable)
const urlsIsValid = isArrayOf('string', notZeroable)
const tokenIsValid = i => typeof i === 'string'
const pollingIntervalIsValid = i => typeof i === 'number'
const keybindingsIsValid = i => Object.values(i).every(value => filterNames.includes(value.toString()))

export const validateConfig = (config: Partial<Config>): config is Config =>
  blacklistIsValid(config.blacklist) &&
  keybindingsIsValid(config.keybindings) &&
  teammatesIsValid(config.teammates) &&
  pollingIntervalIsValid(config.pollingInterval) &&
  urlsIsValid(config.urls) &&
  tokenIsValid(config.token)

const maybeConfig = JSON.parse(fileContents)
export default validateConfig(maybeConfig) ? maybeConfig : defaultConfig
