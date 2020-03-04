import config from './components/config'

import { Dict, Pull } from './types'

type Filter = (list: Pull[]) => Pull[]

const oneDayInSeconds = 1000 * 60 * 60 * 24
const twoDaysInSeconds = oneDayInSeconds * 2

const openedWithin = time => ({ created_at }) => {
  const now = new Date().getTime()
  const createdAt = new Date(created_at).getTime()
  return createdAt + time > now
}

const filters: Dict<Filter> = {
  noFilter: pulls => pulls,
  clearAll: pulls => [],
  lastDay: pulls => pulls.filter(openedWithin(oneDayInSeconds)),
  lastTwoDays: pulls => pulls.filter(openedWithin(twoDaysInSeconds))
}

export const filterNames: string[] = Object.keys(filters)
export const toFilter = key => filters[config.keybindings[key]]

export default filters
