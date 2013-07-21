var fs = require('fs-extra'),
    path = require('path'),
    async = require('async');

module.exports = csl = {
  
  "config": {
    "mypath": module.filename,
    "ext": ".csl",
    "source": {
      "independent": "./citationstyles-org",
      "dependent": "./citationstyles-org/dependent"
    }
  },
  
  "_init": function (callback) {
  
    var self = this;
    
    // just do it once
    if (self._list && !self._list.length) {
      return callback(null, self._list);
    }
    else {
      self._list = [];
    }
      
    // "independent" only, for now
    var source = path.resolve(path.join(self.config.mypath, '..'),  self.config.source.independent);
  
    // - get list of independent styles …
    fs.readdir(source, function (err, styles) {
    
      // - catch error or empty result
      if (err || !styles) { 
        callback(err || new Error("No styles found!")); 
      }
        
      // - filter the non-csl files from `styles` list
      // - make obj for each item
      function readStyles(styles, callback) {
        // body...
      }
    
      var list = self._list;
      styles.forEach(function (item) {
      
        // - if it is "foo.csl"
        if (path.extname(item) === self.config.ext) {
            
          // TODO: read some props from xml…
          var obj = {
            "id": item.replace(self.config.ext, ''), // "foo"
            "path": path.resolve(self.config.mypath, '..', self.config.source.independent, item)
          };

          // - push to results
          list.push(null, obj);
        
        }
      
      });
      
      // - callback with resulting array of objs
      callback(null, {
        "independent": list
      });
            
    });
  
  }
  
};

csl.list = function list (callback) {
  
  var self = this;
  
  // one-time init
  csl._init(function (err, res) {
    
    if (err) { callback(err); }

    // - callback with resulting array of objs
    callback(null, {
      "independent": self._list
    });
  
  });
  
};
