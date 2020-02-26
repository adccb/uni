const fs = require('fs')

jest.mock('fs')

fs.readFileSync.mockReturnValue(
  JSON.stringify({
    blacklist: [1, 2, 3],
    keybindings: {},
    teammates: ['charlie brown', 'mr. t', 'alyssa milano'],
    pollingInterval: 10,
    urls: ['hello/world'],
    token: ''
  })
)
