const schedule = require('node-schedule');
const log = require('./logger');

const builder = (period, handler, name) => {
  schedule.scheduleJob(period, () => {
    handler()
      .then(result => {
        log.info(`Schedule ${name} success`, { result });
      })
      .catch(e => {
        log.error(`Schedule ${name} error`, { error: e.message, stack: e.stack });
      });
  });
};

module.exports = builder;