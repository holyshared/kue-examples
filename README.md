# kue-examples

## Requirements

* Redis

## Server

```js
var messenger = require('./messenger').server;
var actions = require('./actions');

var server = messenger({
  redis: {
    host: 'localhost',
    port: 6379
  }
});
var logger = require('./logger');

server.logger(logger)
  .register({
    type: 'example',
    action: (job, done) {
      done();
    }
  }).start();

function shutdown(sig) {
  server.shutdown(5000).then(function () {
    process.exit();
  }).catch(function () {
    process.exit(-1);
  });
}

process.once('SIGTERM', shutdown);
process.once('SIGINT', shutdown);
```
