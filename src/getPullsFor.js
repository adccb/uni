const axios = require("axios");

const { headers, tee } = require("./utils");
const { isValid } = require("./validations");
const { formatPull } = require("./formatters");

const getPullsFor = token => url =>
  token === ""
    ? console.log("please provide a github api token in config.json.")
    : axios
        .get(url, { headers: headers(token) })
        .then(({ data }) =>
          data.filter(isValid).map(pull => console.log(formatPull(pull)))
        )
        .catch(err => console.log(err));

module.exports = { getPullsFor };
