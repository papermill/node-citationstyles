var fs = require('fs-extra'),
    path = require('path'),
    async = require('async');

module.exports = citationstyles = function citationstyles(callback) {
  
  var config = {
    "source": "citationstyles-org",
    "ext": ".csl",
    "mypath": module.id
  };
  
  fs.readdir(config.source, function (err, files) {
    
    // filter the list
    async.map(
      files, 
      function filter(string, callback) {
        
        // if it is "foo.csl"
        if (path.extname(string) === config.ext) {
          
          var res = {
            "id": string.replace(config.ext, ''), // "foo"
            "filename": path.join(config.mypath, string)
          };
          
          // push to results
          return callback(null, res);
          
        }
        // otherwise don't push (remove from list)
        else {
          callback(null);
        }
        
      },
      callback
    );
    
  })
  
}


// example usage
// citationstyles(function (err, res) {
//   console.log(err || res);
// });
