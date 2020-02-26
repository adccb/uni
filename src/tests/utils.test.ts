import config from '../components/config'

import { headers, isArrayOf, tee, isOnTeam, pullIsValid } from '../utils'

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
    global.console.log = jest.fn()

    const val = 'hello'
    expect(tee(val)).toEqual(val)
    expect(console.log).toHaveBeenCalledWith({ val })
  })
})

describe('isOnTeam', () => {
  it('returns true if string is in teammates array, case-insensitively', () => {
    expect(isOnTeam('charlie brown', config)).toBe(true)
    expect(isOnTeam('cHaRlIe bRoWn', config)).toBe(true)
  })

  it('returns false if string is not in teammates array', () => {
    expect(isOnTeam('this is a test', config)).toBe(false)
  })
})

describe('pullIsValid', () => {
  const buildPull = (login, number) => ({
    number,
    user: { login }
  })

  it('returns true if pull is valid', () => {
    const validPull = buildPull('mr. t', 20)
    expect(pullIsValid(validPull, config)).toBe(true)
  })

  it('returns true if pull is valid', () => {
    const invalidTeammate = buildPull('bill clinton', 20)
    expect(pullIsValid(invalidTeammate, config)).toBe(false)

    const invalidNumber = buildPull('charlie brown', 2)
    expect(pullIsValid(invalidNumber, config)).toBe(false)

    const invalidBoth = buildPull('alyssa milano', 1)
    expect(pullIsValid(invalidBoth, config)).toBe(false)
  })
})
