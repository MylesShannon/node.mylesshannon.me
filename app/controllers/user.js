var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function (app, auth) {
  app.use('/api/v1/user', auth, router);
};

router.get('/', function (req, res, next) {
  User.findById(req.currentUser.id, (err, data) => {
    if(!err) {
      res.json(data.toObject()).status(200);
    } else {
      res.json({ msg: 'Failed to get user data', status: 500 }).status(500);
    }
  });
});
