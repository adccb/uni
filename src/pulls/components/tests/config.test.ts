import config, { validateConfig } from '../config'

describe('validateConfig', () => {
  const defaultKeybindings = {
    c: 'clearAll',
    n: 'noFilter'
  }

  const buildConfig = ({
    blacklist = [1, 2, 3, 4],
    keybindings = defaultKeybindings,
    teammates = ['hello', 'world'],
    pollingInterval = 0,
    token = 'this is a token',
    unteammates = ['hello', 'unteammates'],
    urls = ['ggogle.oggle', 'whatever.co']
  }) => ({ blacklist, keybindings, teammates, pollingInterval, token, unteammates, urls })

  // some values as shorthands
  const string = 'string'
  const stringArray = [string]
  const numberArray = [1234]
  const emptyArray = []
  const validKeybindings = { a: 'noFilter' }
  const invalidKeybindings = { a: 'something else' }

  const testConfigWith = async partialConfig => await validateConfig(buildConfig(partialConfig))

  it('validates busted types', async () => {
    expect(await testConfigWith({ blacklist: numberArray })).toBe(true)
    expect(await testConfigWith({ blacklist: stringArray })).toBe(false)

    expect(await testConfigWith({ teammates: stringArray })).toBe(true)
    expect(await testConfigWith({ teammates: numberArray })).toBe(false)
    expect(await testConfigWith({ teammates: emptyArray })).toBe(false)

    expect(await testConfigWith({ keybindings: validKeybindings })).toBe(true)
    expect(await testConfigWith({ keybindings: invalidKeybindings })).toBe(false)

    expect(await testConfigWith({ pollingInterval: 10 })).toBe(true)
    expect(await testConfigWith({ pollingInterval: numberArray })).toBe(false)
    expect(await testConfigWith({ pollingInterval: emptyArray })).toBe(false)

    expect(await testConfigWith({ token: string })).toBe(true)
    expect(await testConfigWith({ token: numberArray })).toBe(false)
    expect(await testConfigWith({ token: stringArray })).toBe(false)

    expect(await testConfigWith({ urls: stringArray })).toBe(true)
    expect(await testConfigWith({ urls: numberArray })).toBe(false)
    expect(await testConfigWith({ urls: emptyArray })).toBe(false)
  })
})
