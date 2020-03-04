const cache = {}
export const getPulls = url => cache[url]
export const persist = url => payload => ((cache[url] = payload), payload)
