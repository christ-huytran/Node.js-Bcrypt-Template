var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
  create: function (req, res) {
    var newUser = new User(req.body);
    newUser.save(function(err) {
      if (err) {
        var errors = [];        
        for (var key in err.errors) {
          errors.push(err.errors[key].message);
        }
        res.send(errors);
      } else {
        res.json(true);
      }
    })
  },

  show: function(req, res) {
    User.find({}, function (err, users) {
      if (err) console.log(err);
      res.json(users);
    })
  }
}