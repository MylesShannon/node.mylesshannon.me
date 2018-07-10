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
    port: process.env.PORT || 80,
    db: 'mongodb://localhost/node-mylesshannon-me-production',
    cors: ['https://jot.mylesshannon.me', 'https://directd.mylesshannon.me', 'https://news.mylesshannon.me', 'https://mylesshannon.me']
  }
};

module.exports = config[env];
