const cache = {}
const getPulls = url => cache[url]
const persist = (url, payload) => ((cache[url] = payload), payload)

module.exports = { getPulls, persist }
