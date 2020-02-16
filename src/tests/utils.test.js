const { headers, isArrayOf } = require('../utils')

describe('headers', () => {
  it('attaches the correct token header', () => {
    const token = 'a string'
    expect(headers(token)).toEqual({ Authorization: 'token a string' })
  })

  describe('isArrayOf', () => {
    it('works on non-collections', () => {
      expect(isArrayOf('string')(['', '', '', ''])).toBe(true)
      expect(isArrayOf('number')([1, 2, 3, 4])).toBe(true)
      expect(isArrayOf('number')([])).toBe(true)
    })
  })
})
