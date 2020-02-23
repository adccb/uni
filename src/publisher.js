const s = new Proxy({}, { get: (s, key) => (key in s ? s[key] : (s[key] = [])) })

const publish = (event, payload) => s.event.forEach(sub => sub(payload))
const on = (event, cb) => s.event.push(cb)

module.exports = { on, publish }
