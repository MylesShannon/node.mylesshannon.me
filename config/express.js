var express = require('express'),
  glob = require('glob'),
  cors = require('cors'),
  jwt = require('njwt'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  compress = require('compression'),
  methodOverride = require('method-override');

module.exports = function(app, config) {
  var authMiddleware = (req, res, next) => {
    if(req.headers.authorization) {
      jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET, (err, jwt) => {
        if(!err){
          req.currentUser = { id: jwt.body.sub };
          next();
        } else if(jwt.body.exp < Date.now() / 1000) {
          res.json({ msg: 'Token has expired', status: 403 }).status(403);
        } else {
          res.json({ msg: 'Error validating token', status: 500 }).status(500);
        }
      })
    } else {
      res.json({ msg: 'authorization denied', status: 403 }).status(403);
    }
  };

  var corsConfig = {
    origin: config.cors,
    optionsSuccessStatus: 200,
    allowedHeaders: 'authorization, content-type, x-xsrf-token',
    credentials: true,
    maxAge: 1728000
  };

  var env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());
  app.use(cors(corsConfig));

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app, authMiddleware);
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
      });
  });
};
