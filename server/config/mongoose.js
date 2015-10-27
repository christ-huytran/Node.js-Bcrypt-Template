  var mongoose = require('mongoose');
        var fs = require('fs');
      var path = require('path');

mongoose.connect('mongodb://localhost/demo_mongoose');

var modelsPath = path.join(__dirname, './../models');

fs.readdirSync(modelsPath).forEach(function (file) {
  if(file.indexOf('.js') >= 0) {
    require(modelsPath + '/' + file);
  }
});