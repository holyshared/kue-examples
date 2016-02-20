require('toml-require').install();

var client = require('./messenger').client;
var options = require('./options');

client(options).register({
  message: 'example'
}).then(function () {
  process.exit();
});
