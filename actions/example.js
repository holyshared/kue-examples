var logger = require('../logger');

module.exports = {
  type: 'example',
  action: function (job, done) {
    logger.info('ok');
    job.log('ok');
    done();
  }
};
