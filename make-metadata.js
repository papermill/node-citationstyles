var fs = require('fs-extra'),
    path = require('path'),
    async = require('async'),
    parseXML = require('xml2js').parseString;

module.exports = {};

module.exports.init = function init(callback) {
    
  // "independent" only, for now
  var source = path.resolve(
                  self.config.mypath,
                  self.config.source.independent
                );

  // - get list of independent styles …
  fs.readdir(source, function (err, styles) {
  
    // - catch error or empty result
    if (err || !styles) { 
      callback(err || new Error("No styles found!")); 
    }

    var list = self._list;
      
    // - filter the non-csl files from `styles` list
    // - make obj for each item
    async.each(
      styles, 
      function (item, callback) {
    
        // - if it is "foo.csl"
        if (path.extname(item) === self.config.ext) {
        
          // contruct basic obj
          var obj = {
            "id": item.replace(self.config.ext, ''), // "foo"
            "path": path.resolve(self.config.mypath, self.config.source.independent, item)
          };

          // - read some props from xml…
          readXML(obj.path, function (err, res) {
          
            var info = res.style.info;
            
            // require('eyes').inspect(info);
            
            // - grab some info about the styles
            obj.url = info.id;
            ['issn', 'eissn', 'title', 'updated'].forEach(function (prop) {
              obj[prop] = info[prop];
            });
            
            // - push to results
            list.push(obj);
            
            // - no error so far, continue
            callback(null);
          
          });
        
        }
              
      },
      function (err) {
      
        console.log(err);
        
        // - callback with resulting array of objs
        callback(err || null, {
          "independent": list
        });
          
      }

    );

  });

}


// internal functions
function readXML(path, callback) {
    
  fs.readFile(path, function (err, data) {
    
    parseXML(data, callback);
  
  })  
  
}
