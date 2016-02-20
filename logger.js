var log4js = require('log4js');

log4js.configure({
  appenders: [
    { type: 'console', category: 'development' },
    { type: 'file', filename: './messenger.log', category: 'staging' },
    { type: 'file', filename: './messenger.log', category: 'production' }
  ]
});

module.exports = log4js.getLogger(process.env.NODE_ENV || 'development');
