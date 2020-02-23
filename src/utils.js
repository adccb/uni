const headers = token => ({ Authorization: `token ${token}` })
const tee = val => (console.log(val), val)
const noop = () => null
const dateDescending = (a, b) => new Date(b.created_at) - new Date(a.created_at)

const isArrayOf = (type, zeroable = true) => collection =>
  Array.isArray(collection) && (zeroable || collection.length >= 1) && collection.every(i => typeof i === type)

const executeAndSetTimer = (fn, initialProps, subsequentProps, time) => (
  fn(initialProps), setInterval(() => fn(subsequentProps), time)
)

module.exports = {
  headers,
  tee,
  noop,
  dateDescending,
  isArrayOf,
  executeAndSetTimer
}
