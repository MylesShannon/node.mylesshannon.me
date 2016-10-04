var express = require('express'),
  router = express.Router(),
  ObjectID = require('mongodb').ObjectID,
  mongoose = require('mongoose'),
  Bill = mongoose.model('Bill');

module.exports = (app, auth) => {
  app.use('/api/v1/vote', auth, router);
}

router.post('/:billId', (req, res, next) => {
  User.find({ _id: req.currentUser.id, _votes_by_bill : { $in : [req.params.billId] } }, (err, userVote) => {
    if(!err && userVote.length) {
      res.status(400).json({
        'msg': 'Vote already counted',
        'status': 400
      });
    } else if(!err && !userVote.length) {
      User.update({_id: req.currentUser.id}, {$push: {'_votes_by_bill': req.params.billId} }, {upsert:true}, (err, user) => {
        if(!err) {
            Bill.update({_id: req.params.billId}, {$push: { '_votes_by_user' : req.currentUser.id} }, {upsert:true}, (err, bill) => {
              if(!err) {
                res.status(200).json({
                  'msg': 'Vote counted',
                  'status': 200
                });
              } else {
                res.sendStatus(500);
              }
            });
        } else {
          res.sendStatus(500);
        }
      });
    } else {
      res.sendStatus(500);
    }
  });
});

router.delete('/:billId', (req, res, next) => {
  User.update({ _id: req.currentUser.id }, { $pull: { _votes_by_bill: req.params.billId } }, (err) => {
    if(!err) {
      Bill.update({ _id: req.params.billId }, { $pull: { _votes_by_user: req.currentUser.id } }, (err) => {
        if(!err) {
          res.status(200).json({id: req.params.billId, msg: 'Vote removed', status: 200 });
        } else {
          res.sendStatus(500);
        }
      });
    } else {
      res.sendStatus(500);
    }
  });
});
