var csl = require('../csl'),
    vows = require('vows'),
    assert = require('assert'),
    fs = require('fs-extra'),
    eyes = require('eyes'),
    crypto = require('crypto');

var config = {
  "stylecount": 842,
  "hash": "0e963260c8056d089a7002a9b70f3c4330bd5edb"
};

// Create a Test Suite
vows.describe('Citation Styles').addBatch({
  
  'API': {
    
      '*csl.list()* styles-list': {
        topic: function () {
          csl.list(this.callback); // lists the built-in styles (async)
        },
        
        'should have known sum of styles': function (styles) {
          // console.log(styles);
          assert.strictEqual(styles.length, config.stylecount);
        },
        
        'should have known hash': function (styles) {
          var shasum = crypto.createHash('sha1')
          shasum.update(JSON.stringify(styles));
          var hash = shasum.digest('hex');
          assert.strictEqual(hash, config.hash);
        },
        
        'some item in the middle': {
          topic: function (styles) {
            var middle = parseInt(styles.length/2);
            return styles[middle];
          },
          
          'is not empty': function (item) {
            assert.ok(item);
          },
          
          'has a `path` property': function (item) {
            assert.ok(item.path);
          },
          
          'should have `path` pointing to existing file': {
            topic: function (item) {
              fs.exists(item.path, this.callback);
            },
            'which actually exists': function (exists) {
              assert.ok(exists);
            }
          }
        }
        
      }
      
    }
}).export(module); // Export it
