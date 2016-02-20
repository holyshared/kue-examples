require('toml-require').install();

var options = {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
};

if (process.env.NODE_ENV === 'development') {
  options = require('./config.toml');
}

module.exports = options;
