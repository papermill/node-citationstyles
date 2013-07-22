// # Setup    
// 
var fs = require('fs-extra'),
    path = require('path'),
    async = require('async'),
    // non-modules
    config = require('./config.json'),
    csl = {},
    styles = [];

config.mypath = module.filename;
module.exports = csl;

// 
// # API
// 
csl.list = function list (callback) {

  if (!styles.length) {
    return callback(new Error("No styles found!"));
  } 
  else {
    callback(null, styles);
  }

};

// 
// # Internals
// 
// ## Init
// 
// everything is "sync" since here since it happens when we are `require`d.
(function initSync() {
  
  // "independent" styles only, for now
  var source = path.resolve(path.join(config.mypath, '..'),  config.source.independent);

  // - get list of independent styles …
  var files = fs.readdirSync(source);

  // - catch error/empty result
  if (!files) { 
    callback(err || new Error("No files found!")); 
  }

  // - filter the non-csl files from `files` list
  // - make obj for each item, push that to `styles`

  files.forEach( function filter(item) {

      // - if it is "foo.csl"
      if (path.extname(item) === config.ext) {
    
        // TODO: read some props from xml…
        var obj = {
          "id": item.replace(config.ext, ''), // "foo"
          "path": path.resolve(config.mypath, '..', config.source.independent, item)
        };

        // - push to results
        styles.push(obj);
      }
    
  });
}());