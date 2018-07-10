var express = require('express'),
  router = express.Router(),
  ObjectID = require('mongodb').ObjectID,
  mongoose = require('mongoose'),
  Article = mongoose.model('Article');

module.exports = (app, auth) => {
  app.use('/api/v1/articles', router);
}

router.get('/', (req, res, next) => {
  // var timestamp = new Date(Date.now() - 1 * 60 * 60 * 1000);
  // var hexSeconds = Math.floor(timestamp/1000).toString(16);

  // Article.find({ "_id": { "$gt" : ObjectID(hexSeconds + "0000000000000000") } }).sort('published').populate('_feed').exec((err, articles) => {
  //   res.json(
  //     articles.map((a) => { return a.toObject() })
  //   ).status(200);
  // });
  Article.find({}).limit(50).sort({'published': -1}).populate('_feed').exec((err, articles) => {
    res.json(
      articles.map((a) => { return a.toObject() })
    ).status(200);
  });
});
