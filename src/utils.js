const headers = token => ({
  Authorization: `token ${token}`
})
const tee = val => (console.log(val, '\n\n\n'), val)

module.exports = { headers, tee }
