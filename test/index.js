var csl = require('../csl'),
    vows = require('vows'),
    assert = require('assert'),
    fs = require('fs-extra'),
    f = require('underscore'),
    eyes = require('eyes'),
    crypto = require('crypto');

var config = {
  "stylecount": 857,
  "hash": "3937e656c9f3128f7673ffddc933f5fd30100248"
};

// Create a Test Suite
vows.describe('Citation Styles API').addBatch({
  
  '*csl.list()*': {
    
      'returns a styles-list': {
        topic: function () {
          csl.list(this.callback); // lists the built-in styles (async)
        },
        
        'should have known sum of styles': function (styles) {
          console.log(f.first(styles, 10));
          console.log(f.last(styles, 10));
          assert.strictEqual(styles.length, config.stylecount);
        },
        
        // 'should have known hash': function (styles) {
        //   // filter the path first, since it is unique for each install
        //   var data = [];
        //   f.each(styles, function(item){ 
        //     if (item.path) {
        //       var obj = f.clone(item);
        //       delete obj.path
        //     }
        //     data.push(obj);
        //   });
        //   var shasum = crypto.createHash('sha1')
        //   shasum.update(JSON.stringify(data));
        //   var hash = shasum.digest('hex');
        //   assert.strictEqual(hash, config.hash);
        // },
        
        'where some item in the middle': {
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
          
          'should have `path` pointing to a file': {
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
