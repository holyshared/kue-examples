var server = require('./messenger').server;
var actions = require('./actions');

server(require('./options')).register(actions.example);
