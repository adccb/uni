const tee = val => (console.log(val, '\n\n\n'), val)
const headers = token => ({
  Authorization: `token ${token}`
})
const isArrayOf = (type, zeroable = true) => collection =>
  Array.isArray(collection) && (zeroable || collection.length >= 1) && collection.every(i => typeof i === type)

module.exports = { headers, tee, isArrayOf }
