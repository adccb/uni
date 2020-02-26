# pulls

here's a script. it'll fetch your teammates' currently open PRs.

## usage

```bash
$ cd path/to/pulls
$ npm start # starts in watch mode
$ npm run start:once # starts in one-shot mode
```

(protip: `alias pulls="npm start --prefix path/to/pulls"`)

## configuration

`$ mv config.example.json ~/.config/pulls/config.json`

### values

`"blacklist"`: a list of numbers corresponding to specific PRs you'd like to not show up in this list.

`"teammates"`: a whitelist of strings corresponding to your teammates' github usernames. only these people will appear in the results.

`"pollingInteval"`: a number corresponding to how many seconds to wait between repulls in `--watch` mode.

`"token"`: a personal access token from github.

`"urls"`: a list of strings corresponding to repo urls, in the form `:owner/:repo`. _trailing slashes are not supported and will break._

## example output


```
$ pulls

cHaRlIeBrOwN (18 hours) | Add tests to catch the case where Widgets don't update...
  https://github.com/owner/repo/pull/18044

Carlos_Santana (a day) | add edit-owner-name mutation so the frontend...
  https://github.com/owner/smaller-repo/pull/340

williamjclinton (12 days) | Add "id" field to a bunch of gql queries for apollo cache...
  https://github.com/owner/yet-other-repo/pull/2
```

