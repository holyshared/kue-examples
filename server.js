require('toml-require').install();

var messenger = require('./messenger').server;
var options = require('./config.toml').server;
var actions = require('./actions');

var server = messenger(options);
server.register(actions.example);

function shutdown(sig) {
  server.shutdown(5000).then(function () {
    console.log('shutdown');
    process.exit();
  }).catch(function (err) {
    console.log('shutdown: ', err || '');
  });
}

process.once('SIGTERM', shutdown);
process.once('SIGINT', shutdown);
