var path = require('path'),
  rootPath = path.normalize(__dirname + '/..'),
  env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'node-mylesshannon-me'
    },
    port: process.env.PORT || 8002,
    db: 'mongodb://localhost/node-mylesshannon-me-development',
    cors: 'http://localhost:8080'
  },

  test: {
    root: rootPath,
    app: {
      name: 'node-mylesshannon-me'
    },
    port: process.env.PORT || 8002,
    db: 'mongodb://localhost/node-mylesshannon-me-test',
    cors: 'http://localhost:8080'
  },

  production: {
    root: rootPath,
    app: {
      name: 'node-mylesshannon-me'
    },
    port: process.env.PORT || 442,
    db: 'mongodb://localhost/node-mylesshannon-me-production',
    cors: 'http://localhost:8080'
  }
};

module.exports = config[env];
