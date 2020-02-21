const tee = val => (console.log(val, '\n\n\n'), val)
const headers = token => ({
  Authorization: `token ${token}`
})
const def = fn => fn()
const dateDescending = (a, b) => new Date(b.created_at) - new Date(a.created_at)
const isArrayOf = (type, zeroable = true) => collection =>
  Array.isArray(collection) && (zeroable || collection.length >= 1) && collection.every(i => typeof i === type)
const executeAndSetTimer = (fn, time) => (fn(), setInterval(fn, time))
const noop = () => null
const chain = init => (...fns) => fns.reduce((oldVal, fn) => fn(oldVal), init)
const emptyChain = chain(undefined)

module.exports = {
  headers,
  tee,
  isArrayOf,
  def,
  dateDescending,
  executeAndSetTimer,
  noop,
  chain,
  emptyChain
}
