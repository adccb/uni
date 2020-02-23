const filters = {
  noFilter: output => output,
  clearAll: output => false
}

filters.filterNames = Object.keys(filters)

module.exports = filters
