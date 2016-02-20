module.exports = {
  type: 'example',
  action: function (job, done) {
    job.log('ok');
    done();
  }
};
