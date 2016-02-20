var kue = require('kue');

function MessengerClient(options) {
  this.client = kue.createQueue(options);
}

MessengerClient.prototype.register = function (params) {
  this.client.create('example', params).delay(1000).save();
}

module.exports = function (options) {
  return new MessengerClient(options);
};
