require('toml-require').install();

var server = require('./messenger').server;
var options = require('./config.toml').server;
var actions = require('./actions');

server(options).register(actions.example);
