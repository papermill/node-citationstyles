*experimental work in progress, do **not** use this seriously!*

# citationstyles

![build status](https://api.travis-ci.org/papermill/node-citationstyles.png?branch=master)

This packages the `CSL` collection from <http://citationstyles.org> for usage with `node.js`.

---

# API/Usage

## `list(callback)`

The only argument is a `callback` function, which gets called with an array of built-in styles
 
### example usage:

```js
var csl = require('citatonstyles');

csl.list(function (err, res) {
  console.log(err || res);
  });
```

should log:

```js
[ { id: 'academy-of-management-review',
    path: '/path/to/academy-of-management-review.csl' } ]
```

# Bugs

- "dependent" styles are ignored for now, since I have not figured out how to actually use them (with `pandoc`)
- if you found more, please [report them](https://github.com/papermill/node-citationstyles/issues)

# Versioning

- using [`semver`](http://semver.org)
- 'PATCH' (the last number) will get updated for every change in the upstream styles repo
- the git short hash of the upstream repo will be added as build metadata

# Licence

[Creative Commons Attribution-ShareAlike 3.0 Unported](http://creativecommons.org/licenses/by-sa/3.0/), 
 [same as the styles themselves](https://github.com/citation-style-language/styles/blob/master/README.md#licensing).
