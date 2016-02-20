var kue = require('kue');
var Promise = require('bluebird');

function MessengerClient(options) {
  this.client = kue.createQueue(options);
}

MessengerClient.prototype.register = function (params) {
  var self = this;

  return new Promise(function (resolve, reject) {
    self.client.create('example', params)
      .delay(1000)
      .removeOnComplete(true)
      .save(function (err) {
        if (err) {
          return reject(err);
        }
        resolve();
      });
  });
}

module.exports = function (options) {
  if (!MessengerClient.__instance__) {
    MessengerClient.__instance__ = new MessengerClient(options);
  }
  return MessengerClient.__instance__;
};
