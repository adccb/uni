const { teammates = [], blacklist = [] } = require("../config");

const isOnTeam = username => teammates.includes(username.toLowerCase());
const isValid = pull =>
  isOnTeam(pull.user.login) && !blacklist.includes(pull.number);

module.exports = { isOnTeam, isValid };
