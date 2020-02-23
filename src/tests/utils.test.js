const { headers, isArrayOf, tee } = require('../utils')

describe('headers', () => {
  it('attaches the correct token header', () => {
    const token = 'a string'
    expect(headers(token)).toEqual({ Authorization: 'token a string' })
  })
})

describe('isArrayOf', () => {
  it('works on non-collections', () => {
    expect(isArrayOf('string')(['', '', '', ''])).toBe(true)
    expect(isArrayOf('number')([1, 2, 3, 4])).toBe(true)
    expect(isArrayOf('number')([])).toBe(true)
  })
})

describe('tee', () => {
  it('console logs and returns the value', () => {
    global.console = { log: jest.fn() }
    expect(tee('hello')).toEqual('hello')
    expect(console.log).toHaveBeenCalledWith('hello')
  })
})
