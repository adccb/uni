# pulls

here's a script. it'll fetch your teammates' currently open PRs.

## usage

i'm currently running this with `node index.js`. (technically i have an alias, but.) if you want to throw a node shebang somewhere and just call it, that could be cool too.


## configuration

`$ mv config.example.json config.json`

### values

`"blacklist"`: a list of numbers corresponding to specific PRs you'd like to not show up in this list.

`"teammates"`: a whitelist of strings corresponding to your teammates' github usernames. only these people will appear in the results.

`"pollingInteval"`: a number corresponding to how many seconds to wait between repulls in `--watch` mode.

`"token"`: a personal access token from github.

`"urls"`: a list of strings corresponding to repo urls, in the form `:owner/:repo`. _trailing slashes are not supported and will break._

## example output


```bash
$ pulls
mxtetrachord | Add README to pulls repo | 23 minutes ago | https://github.com/mxtetrachord/pulls/31
```

