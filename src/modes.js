const { urls } = require('../config')

const { formatOutput } = require('./formatters')
const writeOutput = console.log

const oneShot = (urls, getPulls) =>
  Promise.all(urls.map(getPulls))
    .then(formatOutput)
    .then(writeOutput)

const watch = () => console.log('watch mode coming soon!')

module.exports = { oneShot, watch }
