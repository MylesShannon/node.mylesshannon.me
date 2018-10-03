var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Bill = mongoose.model('Bill')

module.exports = (app, auth) => {
  app.use('/api/v1/user', auth, router);
};

router.get('/', (req, res, next) => {
  User.findById(req.currentUser.id).populate('_crafts_by_id').exec((err, data) => {
    if(!err) {
      res.json(data.toObject()).status(200);
    } else {
      res.json({ msg: 'Failed to get user data', status: 500 }).status(500);
    }
  });
});

router.post('/remove', (req, res, next) => {
  User.findById(req.currentUser.id, (err, user) => {
    if(!err) {
      for(var i = 0; i < user['_votes_by_bill'].length; i++) {
        Bill.findByIdAndUpdate(user['_votes_by_bill'][i], {$pull: {'_votes_by_user': req.currentUser.id}}, (err, bill) => {
          if(!err) {
            user.remove((err, data) => {
              if(!err) {
                res.json(data.toObject()).status(200);
              } else {
                res.json({ msg: 'Failed to remove user', status: 500 }).status(500);
              }
            });
          } else {
            res.json({ msg: 'Failed to remove user', status: 500 }).status(500);
          }
        });
      }
    } else {
      res.json({ msg: 'Failed to remove user', status: 500 }).status(500);
    }
  })
});
