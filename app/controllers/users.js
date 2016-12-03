var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = (app) => {
  app.use('/api/v1/users', router);
};

router.get('/total', (req, res, next) => {
  User.count({}, (err, total) => {
    if(!err) {
      res.json(total).status(200);
    } else {
      res.json({ msg: 'Failed to get user count', status: 500 }).status(500);
    }
  })
});

router.get('/:userId', (req, res, next) => {
  User.findById(req.params.userId, (err, user) => {
    if(!err) {
      res.json(user.toObject()).state(200);
    } else {
      res.json({ msg: 'Failed to get user data', status: 500 }).status(500);
    }
  })
});
