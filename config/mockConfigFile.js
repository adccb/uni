const fs = require('fs')

jest.mock('fs')

fs.readFileSync.mockImplementation(path => {
  if (/config\.json$/.test(path)) {
    return JSON.stringify({
      blacklist: [1, 2, 3],
      keybindings: {},
      teammates: ['charlie brown', 'mr. t', 'alyssa milano'],
      pollingInterval: 10,
      urls: ['hello/world'],
      token: ''
    })
  } else if (/todo\.json$/.test(path)) {
    return JSON.stringify({
      todos: ['default val']
    })
  }
})
