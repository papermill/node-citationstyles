var csl = require('../csl'),
    vows = require('vows'),
    assert = require('assert'),
    fs = require('fs-extra'),
    eyes = require('eyes'),
    crypto = require('crypto');

var config = {
  "stylecount": 1684,
  "hash": "998d969063e04c25f13c6a6aede4c37119125672"
};

// Create a Test Suite
vows.describe('Citation Styles').addBatch({
  
    '*csl.list()*': {
        topic: function () {
          csl.list(this.callback);
        },
        'lists the built-in styles (async)': {
          'number of styles is correct': function (styles) {
            console.log(styles);
            assert.strictEqual(styles.independent.length, config.stylecount);
          },
          'hash is correct': function (styles) {
            var shasum = crypto.createHash('sha1');
            shasum.update(styles.independent.toString());
            var hash = shasum.digest('hex');
            assert.strictEqual(hash, config.hash);
          },
          
          'some item in the middle of the list': {
            topic: function (styles) {
              var middle = parseInt(styles.independent.length/2);
              return styles.independent[1683];
            },
            'is not empty': function (item) {
              assert.ok(item);
            },
            'it has a `path` property': function (item) {
              assert.ok(item.path);
            },
            'the `path` points to a file': {
              topic: function (item) {
                fs.existsSync(item.path, this.callback);
              },
              'the file actually exists': function (exists) {
                assert.equal(exists, true);
              }
            }
          }
        }
    }
}).run(); // Run it
