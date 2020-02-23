const filters = {
  noFilter: output => output,
  clearAll: output => false
}

module.exports = { filters, filterNames: Object.keys(filters) }
