var kue = require('kue');
var consumer = kue.createQueue({
  redis: {
    host: '127.0.0.1',
    port: 6379
  }
});

consumer.process('example', function (job, done) {
  job.log('ok');
  console.log('ok');
  done();
});
consumer.watchStuckJobs();
