var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function (app) {
  app.use('/api/v1/users', router);
};

router.get('/:userId', function (req, res, next) {
  User.findById(req.params.userId, (err, user) => {
    if(!err) {
      res.json(user.toObject()).state(200);
    } else {
      res.json({ msg: 'Failed to get user data', status: 500 }).status(500);
    }
  })
});
