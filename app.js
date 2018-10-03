require('dotenv').config();

var express = require('express'),
  greenlock = require('greenlock-express'),
  config = require('./config/config'),
  glob = require('glob'),
  mongoose = require('mongoose'),
  exec = require('child_process').exec;

mongoose.Promise = require('bluebird');

var startExpress = function() {
  console.log("Starting express server...");

  var models = glob.sync(config.root + '/app/models/*.js');
  models.forEach(function (model) {
    require(model);
  });

  var work = function() {
    // launch workers
    var workers = glob.sync(config.root + '/app/workers/*.js');
    workers.forEach(function(worker) {
      require(worker)();
    });
  }

  var app = express();

  require('./config/express')(app, config);

  if(config.approveDomains && typeof config.approveDomains === 'object') {
    var leChallenge = require('le-challenge-route53').create({
      zone: 'mylesshannon.me', // required
      delay: 20000, // ms to wait before allowing letsencrypt to check dns record (20000 ms is the default)
      debug: false
    });

    greenlock.create({
        version: 'draft-11',
        server: 'https://acme-staging-v02.api.letsencrypt.org/directory',
        configDir: '~/.ssl/acme/',
        email: 'admin@myleshshannon.me', 
        challengeType: 'dns-01',
        challenge: leChallenge,
        approveDomains: config.approveDomains,
        agreeTos: true,
        app: app,
        communityMember: false,
        telemetry: false
    }).listen(config.port);
    console.log('Express server listening on port ' + config.port + ' with SSL');
    work();
  } else {
    app.listen(config.port, function () {
      console.log('Express server listening on port ' + config.port);
      work();
    });
  }
};

var connectWithRetry = function() {
  console.log("Starting mongodb...");
  mongoose.connect(config.db, function(err) {
    if (!err) {
      console.log("Mongodb found!");
      startExpress();
    } else {
      console.log("Mongodb not found, running mongod...");
      exec('mongod --dbpath=/data --port 27017');
      setTimeout(connectWithRetry, 2500);
    }
  });
};

connectWithRetry();
