import config from './components/config'

import axios from 'axios'

import { headers, pullIsValid } from './utils'
import { formatUrl } from './formatters'
import { Pull } from './types'

const getPullsUsing = (token: string) => (url: string): Promise<Pull[]> =>
  axios
    .get(formatUrl(url), { headers: headers(token) })
    .then(({ data }) => data.filter(pull => pullIsValid(pull, config)))
    .catch(err => console.log(err))

export default getPullsUsing
