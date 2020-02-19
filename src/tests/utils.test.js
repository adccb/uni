const { headers, isArrayOf, chain, emptyChain } = require('../utils')

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

describe('chain', () => {
  const fn1 = jest.fn(() => 'one')
  const fn2 = jest.fn(() => 'two')
  const fn3 = jest.fn(() => 'three')

  beforeEach(jest.clearAllMocks)

  it('calls all the fns with the previous value', () => {
    const result = chain('initial')(fn1, fn2, fn3)
    expect(fn1).toHaveBeenCalledWith('initial')
    expect(fn2).toHaveBeenCalledWith('one')
    expect(fn3).toHaveBeenCalledWith('two')
    expect(result).toEqual('three')
  })

  describe('emptyChain', () => {
    it('calls all the fns with undefined as the first', () => {
      const result = emptyChain(fn1, fn2, fn3)
      expect(fn1).toHaveBeenCalledWith(undefined)
      expect(fn2).toHaveBeenCalledWith('one')
      expect(fn3).toHaveBeenCalledWith('two')
      expect(result).toEqual('three')
    })
  })
})
