require('toml-require').install();

var options = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
};

if (process.env.NODE_ENV === 'development') {
  options = require('./config.toml').server;
}

module.exports = options;
