type PublisherPayload = string

const s = new Proxy({}, { get: (s, key) => (key in s ? s[key] : (s[key] = [])) })

export const publish = (event: string, payload: PublisherPayload): void => s[event].forEach(sub => sub(payload))
export const on = (event: string, cb: (payload: PublisherPayload) => void) => s[event].push(cb)
