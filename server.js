require('toml-require').install();

var messenger = require('./messenger').server;
var options = require('./options');
var actions = require('./actions');

var server = messenger(options);
var logger = require('./logger');

server.logger(logger)
  .register(actions.example)
  .start();

function shutdown(sig) {
  server.shutdown(5000).then(function () {
    process.exit();
  }).catch(function () {
    process.exit(-1);
  });
}

process.once('SIGTERM', shutdown);
process.once('SIGINT', shutdown);
