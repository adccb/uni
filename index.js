const axios = require("axios");
const moment = require("moment");
const {
  token = "",
  blacklist = [],
  urls = [],
  teammates = [],
  unteammates = []
} = require("./config");
const headers = { Authorization: `token ${token}` };

const tee = val => (console.log(val, "\n\n\n"), val);
const isOnTeam = username => teammates.includes(username.toLowerCase());
const isNotOnTeam = username => unteammates.includes(username.toLowerCase());

const isValid = pull =>
  isOnTeam(pull.user.login) &&
  !isNotOnTeam(pull.user.login) &&
  !blacklist.includes(pull.number);

const getPullsFor = url =>
  axios
    .get(url, { headers })
    .then(({ data }) =>
      data
        .filter(isValid)
        .map(pull => [
          pull.user.login,
          pull.title,
          moment(pull.created_at).fromNow(),
          pull._links.html.href
        ])
    );

urls.forEach(async url => {
  let pulls = await getPullsFor(url);
  pulls = pulls.map(p => p.join(" | "));
  console.log(pulls.join("\n"));
});
