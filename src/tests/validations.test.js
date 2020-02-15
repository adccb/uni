const {
  isOnTeam,
  isValid,
  configIsValid,
  isArrayOf
} = require('../validations')

jest.mock(
  '../../config.json',
  () => ({
    teammates: ['charlie brown', 'mr. t', 'fran drescher'],
    blacklist: [1, 2, 3]
  }),
  { virtual: true }
)

describe('isOnTeam', () => {
  it('returns true if string is in teammates array', () => {
    expect(isOnTeam('charlie brown')).toBe(true)
  })

  it('returns false if string is not in teammates array', () => {
    expect(isOnTeam('this is a test')).toBe(false)
  })
})

describe('isValid', () => {
  const buildPull = (login, number) => ({
    number,
    user: { login }
  })

  it('returns true if pull is valid', () => {
    const validPull = buildPull('mr. t', 20)
    expect(isValid(validPull)).toBe(true)
  })

  it('returns true if pull is valid', () => {
    const invalidTeammate = buildPull('bill clinton', 20)
    expect(isValid(invalidTeammate)).toBe(false)

    const invalidNumber = buildPull('charlie brown', 2)
    expect(isValid(invalidNumber)).toBe(false)

    const invalidBoth = buildPull('alyssa milano', 1)
    expect(isValid(invalidBoth)).toBe(false)
  })
})

describe('configIsValid', () => {
  const buildConfig = ({
    blacklist = [1, 2, 3, 4],
    teammates = ['hello', 'world'],
    token = 'this is a token',
    unteammates = ['hello', 'unteammates'],
    urls = ['ggogle.oggle', 'whatever.co']
  }) => ({ blacklist, teammates, token, unteammates, urls })

  const string = 'string'
  const stringArray = [string]
  const numberArray = [1234]
  const emptyArray = []
  const testConfigWith = partialConfig =>
    configIsValid(buildConfig(partialConfig), () => null)

  it('validates busted types', () => {
    expect(testConfigWith({ blacklist: numberArray })).toBe('valid')
    expect(testConfigWith({ blacklist: stringArray })).toBe('blacklist')

    expect(testConfigWith({ teammates: stringArray })).toBe('valid')
    expect(testConfigWith({ teammates: numberArray })).toBe('teammates')
    expect(testConfigWith({ teammates: emptyArray })).toBe('teammates')

    expect(testConfigWith({ token: string })).toBe('valid')
    expect(testConfigWith({ token: numberArray })).toBe('token')
    expect(testConfigWith({ token: stringArray })).toBe('token')

    expect(testConfigWith({ unteammates: stringArray })).toBe('valid')
    expect(testConfigWith({ unteammates: numberArray })).toBe('unteammates')

    expect(testConfigWith({ urls: stringArray })).toBe('valid')
    expect(testConfigWith({ urls: numberArray })).toBe('urls')
    expect(testConfigWith({ urls: emptyArray })).toBe('urls')
  })

  describe('isArrayOf', () => {
    it('works on non-collections', () => {
      expect(isArrayOf('string')(['', '', '', ''])).toBe(true)
      expect(isArrayOf('number')([1, 2, 3, 4])).toBe(true)
      expect(isArrayOf('number')([])).toBe(true)
    })
  })
})
