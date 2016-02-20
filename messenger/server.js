var kue = require('kue');
var Promise = require('bluebird');

function MessengerServer(options) {
  this.server = kue.createQueue(options);
}

MessengerServer.prototype.register = function (processor) {
  this.server.process(processor.type, processor.action);
  return this;
}

MessengerServer.prototype.registerAll = function (processors) {
  processors.forEach(function (processor) {
    this.server.process(processor.type, processor.action);
  }, this);
  return this;
}

MessengerServer.prototype.shutdown = function (delay) {
  var self = this;

  return new Promise(function (resolve, reject) {
    self.server.shutdown(delay, function(err) {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

module.exports = function (options) {
  if (!MessengerServer.__instance__) {
    MessengerServer.__instance__ = new MessengerServer(options);
  }
  return MessengerServer.__instance__;
};
