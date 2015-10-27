var mongoose = require('mongoose');
var User = mongoose.model('User');
var users = require('./../controllers/users.js');
var sessions = require('./../controllers/sessions.js');

module.exports = function (app) {
  app.post('/users', function (req, res) {
    users.create(req, res);
  })

  app.get('/users', function (req, res) {
    users.show(req, res);
  })

  app.post('/sessions', function (req, res) {
    sessions.create(req, res);
  })
}
