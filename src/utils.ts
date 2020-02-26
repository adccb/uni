import { Dict, Pull } from './types'

export const tee = <T>(val: T): T => (console.log({ val }), val)

export const isOnTeam = (username, config) =>
  config.teammates.map(i => i.toLowerCase()).includes(username.toLowerCase())

export const pullIsValid = (pull, config) =>
  isOnTeam(pull.user.login, config) && !config.blacklist.includes(pull.number)

export const headers = token => ({ Authorization: `token ${token}` })
export const noop = () => null
export const dateDescending = (a: Pull, b: Pull): number =>
  new Date(b.created_at).getTime() - new Date(a.created_at).getTime()

export const isArrayOf = (type, zeroable = true) => collection =>
  Array.isArray(collection) && (zeroable || collection.length >= 1) && collection.every(i => typeof i === type)

export const executeAndSetTimer = (fn, initialProps, subsequentProps, time) => (
  fn(initialProps), setInterval(() => fn(subsequentProps), time)
)
