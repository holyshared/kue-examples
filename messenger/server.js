var kue = require('kue');
var Promise = require('bluebird');

function MessengerServer(options) {
  this._server = kue.createQueue(options);
  this._logger = console;
  this._processors = [];
}

MessengerServer.prototype.logger = function (logger) {
  this._logger = logger;
  return this;
}

MessengerServer.prototype.register = function (processor) {
  this._processors.push(processor);
  return this;
}

MessengerServer.prototype.start = function () {
  this._logger.info('server starting');
  this._processors.forEach(function (processor) {
    this._logger.info('job registered: ' + processor.type);
    this._server.process(processor.type, processor.action);
  }, this);
  this._server.watchStuckJobs();
  this._logger.info('server started');
  return this;
}

MessengerServer.prototype.shutdown = function (delay) {
  var self = this;

  return new Promise(function (resolve, reject) {
    this._logger.info('shutdown started');
    self._server.shutdown(delay, function(err) {
      if (err) {
        this._logger.error('shutdown failed: ' + err.stack);
        return reject(err);
      }
      this._logger.info('shutdown finished');
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
