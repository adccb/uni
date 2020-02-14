const { token = "", urls = [] } = require("./config");
const { getPullsFor } = require("./src/getPullsFor");

urls.forEach(getPullsFor(token));
