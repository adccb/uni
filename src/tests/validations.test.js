const { isOnTeam, pullIsValid, configIsValid } = require('../validations')

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

describe('pullIsValid', () => {
  const buildPull = (login, number) => ({
    number,
    user: { login }
  })

  it('returns true if pull is valid', () => {
    const validPull = buildPull('mr. t', 20)
    expect(pullIsValid(validPull)).toBe(true)
  })

  it('returns true if pull is valid', () => {
    const invalidTeammate = buildPull('bill clinton', 20)
    expect(pullIsValid(invalidTeammate)).toBe(false)

    const invalidNumber = buildPull('charlie brown', 2)
    expect(pullIsValid(invalidNumber)).toBe(false)

    const invalidBoth = buildPull('alyssa milano', 1)
    expect(pullIsValid(invalidBoth)).toBe(false)
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
  const testConfigWith = async partialConfig => {
    try {
      return await configIsValid(buildConfig(partialConfig))
    } catch (error) {
      return error
    }
  }

  it('validates busted types', async () => {
    expect(await testConfigWith({ blacklist: numberArray })).toBe('valid')
    expect(await testConfigWith({ blacklist: stringArray })).toBe('blacklist')

    expect(await testConfigWith({ teammates: stringArray })).toBe('valid')
    expect(await testConfigWith({ teammates: numberArray })).toBe('teammates')
    expect(await testConfigWith({ teammates: emptyArray })).toBe('teammates')

    expect(await testConfigWith({ token: string })).toBe('valid')
    expect(await testConfigWith({ token: numberArray })).toBe('token')
    expect(await testConfigWith({ token: stringArray })).toBe('token')

    expect(await testConfigWith({ unteammates: stringArray })).toBe('valid')
    expect(await testConfigWith({ unteammates: numberArray })).toBe('unteammates')

    expect(await testConfigWith({ urls: stringArray })).toBe('valid')
    expect(await testConfigWith({ urls: numberArray })).toBe('urls')
    expect(await testConfigWith({ urls: emptyArray })).toBe('urls')
  })
})
