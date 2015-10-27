var mongoose = require('mongoose');
var User = mongoose.model('User');

var sessionsController = {
  create: function (req, res) {
    User.findOne({ username: req.body.username }, function (err, user) {
      if (err) console.log(err);
      if (!user) {
        return res.send({status: false});
      } else {
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (err) console.log(err);
          return res.send({status: isMatch, user: user});
        })        
      }
    })
  }
}

module.exports = sessionsController;