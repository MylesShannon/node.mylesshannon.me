var express = require('express'),
  router = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  res.send('API is available').status(200);
});

router.get('/api/v1', function (req, res, next) {
  res.send('API is available').status(200);
});
