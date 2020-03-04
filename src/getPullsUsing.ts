import config from './components/config'

import axios from 'axios'

import { headers, pullIsValid } from './utils'
import { formatUrl } from './formatters'
import { Pull } from './types'

const makeRequest = url =>
  axios
    .get(formatUrl(url), { headers: headers(config.token) })
    .catch(err => console.log(err))
    .then(res => res && res.data.filter(pull => pullIsValid(pull, config)))

// $\ this is the stateful part of the app; the "don't get ratelimited" one
// so it's a class
class Github {
  token: string
  urls: string[]

  constructor() {
    this.token = config.token
    this.urls = config.urls
  }

  fetchPulls = () => Promise.all(this.urls.map(makeRequest)).then(repos => repos.flat())
}

export default new Github()
