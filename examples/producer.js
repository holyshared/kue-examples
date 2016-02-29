var kue = require('kue');
var producer = kue.createQueue({
  redis: {
    host: '127.0.0.1',
    port: 6379
  }
});

producer.create('example', {})
  .delay(1000)
  .removeOnComplete(true)
  .save(function (err) {
    if (err) {
      return console.error(err);
    }
    process.exit();
  });
