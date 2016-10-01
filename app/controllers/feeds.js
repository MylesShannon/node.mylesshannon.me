var express = require('express'),
  router = express.Router(),
  ObjectID = require('mongodb').ObjectID,
  url = require('url'),
  mongoose = require('mongoose'),
  Feed = mongoose.model('Feed');

module.exports = (app, auth) => {
  app.use('/api/v1/feeds', router);
}

router.get('/', (req, res, next) => {

  Feed.find({}, function (err, feeds) {
    res.json(
      feeds.map((f) => { return f.toObject() })
    ).status(200);
  });
});

router.post('/', (req, res, next) => {
  var parsedUrl = url.parse(req.body.rss);
  var homepage = parsedUrl.protocol + '//' + parsedUrl.hostname;
  var query = {name: req.body.name, rss: req.body.rss, description: req.body.description, photo: req.body.photo, homepage: homepage};
  var newFeed = new Feed(query);
  newFeed.save((err) => {
    if(!err) {
      res.json({id: newFeed.id}).status(200);
    } else {
      res.json({ msg: 'Error saving feed', status: 500 }).status(500);
    }
  })
});
