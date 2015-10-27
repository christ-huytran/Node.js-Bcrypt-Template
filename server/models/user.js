var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

function validator(input) {
  return input.length >= 2;
}

var usernameValidator = [validator, 'User name must be at least 2 characters long'];

var passwordValidator = [validator, 'Password must be at least 2 characters long'];

var userSchema = new Schema({
  username      :   { type: String, required: 'User name is required', validate: usernameValidator },
  password      :   { type: String, required: 'Password is required', validate: passwordValidator },
  created_at    :   { type: Date, default: Date.now }

});

userSchema.pre('save', function (callback) {
  var user = this;
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) { return callback(err); }
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) { return callback(err); }
      user.password = hash;
      callback();
    })
  })
})

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);

  })
}

mongoose.model('User', userSchema);
