import config from './components/config'

const filters = {
  noFilter: output => output,
  clearAll: output => []
}

export const filterNames: string[] = Object.keys(filters)
export const toFilter = key => filters[config.keybindings[key]]

export default filters
