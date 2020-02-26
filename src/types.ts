export type Dict<T> = Record<string, T>

export type Config = {
  blacklist: number[]
  teammates: string[]
  urls: string[]
  token: string
  pollingInterval: number
  keybindings: Dict<string>
}

export interface Pull {
  created_at: number
}
