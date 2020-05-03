const schedule = require('node-schedule');
const log = require('./logger');

/**
 * Wrapper for ease creation of tasks.
 */

const builder = (period, handler, name) => {
  schedule.scheduleJob(period, () => {
    handler()
      .then(result => {
        if (result) log.info(`Schedule ${name} success: ${result}`);
      })
      .catch(e => {
        log.error(`Schedule ${name} error`, { error: e.message, stack: e.stack });
      });
  });
};

module.exports = builder;
