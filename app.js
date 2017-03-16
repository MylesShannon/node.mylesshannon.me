require('dotenv').config();

var express = require('express'),
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
  var app = express();

  require('./config/express')(app, config);

  app.listen(config.port, function () {
    console.log('Express server listening on port ' + config.port);

    // launch workers
    var workers = glob.sync(config.root + '/app/workers/*.js');
    workers.forEach(function (worker) {
      require(worker)();
    });
  });
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
