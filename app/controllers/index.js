var express = require('express'),
  router = express.Router();

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  res.send('API is available').status(200);
});

router.get('/api/v1', (req, res, next) => {
  res.send('API is available').status(200);
});
