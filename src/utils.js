const tee = val => (console.log(val, '\n\n\n'), val)
const headers = token => ({
  Authorization: `token ${token}`
})

module.exports = { headers, tee }
