const { urls } = require('../config')

const filters = {
  noFilter: output => output,
  clearAll: output => []
}

filters.filterNames = Object.keys(filters)

module.exports = filters
