var csl = require('../csl'),
    assert = require('assert');

var config = {
  "stylecount": 853
};

csl(function (err, styles) {
  
  // console.log(styles);
  
  assert.strictEqual(styles.length, config.stylecount, "Number of styles in repo");
  
})