var csl = require('../csl'),
    assert = require('assert'),
    crypto = require('crypto');

var config = {
  "stylecount": 1684,
  "hash": "998d969063e04c25f13c6a6aede4c37119125672"
};

// test csl.list()
csl.list(function (err, styles) {
  
  if (err) throw err;

  // console.log(styles);

  
  // - check if number of styles in list matches
  // console.log(styles.independent.length);
  assert.strictEqual(styles.independent.length, config.stylecount, "Number of styles in list");
  
  // - check if their hash changed (protect package maintainer against missing upstream updates)
  var shasum = crypto.createHash('sha1');
  shasum.update(styles.independent.toString());
  var hash = shasum.digest('hex');
  // console.log(hash);
  assert.strictEqual(hash, config.hash, "Hash of styles list");
  
})