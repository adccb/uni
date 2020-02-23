const { getPulls, persist } = require('../cache')

describe('cache', () => {
  it('sets and gets the correct data', () => {
    const key = 'hello'
    persist(key, 'world')

    expect(getPulls(key)).toBe('world')
  })
})
