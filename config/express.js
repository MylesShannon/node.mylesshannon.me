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
    var validateToken = (token, split) => {
      jwt.verify(token.split(split)[1], process.env.JWT_SECRET, (err, jwt) => {
        if(!err){
          req.currentUser = { id: jwt.body.sub };
          next();
        } else if(jwt.body.exp < Date.now() / 1000) {
          res.status(403).json({ msg: 'Token has expired', status: 403 });
        } else {
          res.status(500).json({ msg: 'Error validating token', status: 500 });
        }
      })
    }
    if( req.headers.authorization && req.headers.authorization.search('Bearer ') === 0 ) {
      validateToken(req.headers.authorization, ' ');
    } else if(req.headers.cookie && req.headers.cookie.search('token=') === 0) {
      validateToken(req.headers.cookie, '=');
    } else {
      res.status(403).json({ msg: 'authorization denied', status: 403 });
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

  var workers = glob.sync(config.root + '/app/workers/*.js');
  workers.forEach(function (worker) {
    require(worker)();
  });

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
      res.status(err.status || 500).json({
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500).json({
        message: err.message,
        error: {},
        title: 'error'
      });
  });
};
