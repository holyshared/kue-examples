require('toml-require').install();

var client = require('./messenger').client;
var options = require('./config.toml').server;

client(options).register({
  message: 'example'
}).then(function () {
  console.log('ok!');
  process.exit();
});
