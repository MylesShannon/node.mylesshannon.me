var express = require('express'),
  router = express.Router(),
  ObjectID = require('mongodb').ObjectID,
  mongoose = require('mongoose'),
  Bill = mongoose.model('Bill');

module.exports = (app) => {
  app.use('/api/v1/bills', router);
}

router.get('/', (req, res, next) => {
  Bill.find({}).limit(25).sort('-introduced_date').populate('_text').exec((err, bills) => {
    res.json(
      {'bills': bills.map((b) => { return b.toObject() }) }
    ).status(200);
  });
});
