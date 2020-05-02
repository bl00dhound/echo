const Promise = require('bluebird');

const { PUBLISH_QUEUE } = require('../enums/redis-stores.enum');
const dal = require('../dal/message.dal');
const validator = require('../utils/validators.utils');
const { getProcessQueueName, printMessage } = require('../utils/helpers.utils');
const log = require('../providers/logger');

const PROCESS_QUEUE_NAME = getProcessQueueName();

const service = {
  addToMessages: ({ msg, time }) => {
    const timestamp = validator.addToMessages(msg, time);
    return Promise.all([dal.addTimestamp(timestamp), dal.addToMessages(timestamp, msg)]).spread(
      (zaddResult, queueLength) => {
        log.debug(`ZaddResult: ${zaddResult}, QueueLength: ${queueLength}`);
        return true;
      },
    );
  },
  getAvailableTimestamps: () => {
    const now = new Date().valueOf();
    return dal.getTimestampsByNow(now);
  },
  moveToProcessQueue: () => dal.moveToAnotherQueue(PUBLISH_QUEUE, PROCESS_QUEUE_NAME),
  printFromProcessQueue: async () => {
    const message = await dal.popMessageFromProcessQueue(PROCESS_QUEUE_NAME);
    if (!message) return false;
    return printMessage(message);
  },
  moveToPublishQueue: (timestamps = []) => {
    let counter = 0;
    timestamps.forEach(async ts => {
      let hasNext = true;

      while (hasNext) {
        const message = await dal.moveToAnotherQueue(ts, PUBLISH_QUEUE);
        if (!message) hasNext = false;
        counter++;
      }
    });
    return { counter };
  },
  removeBeforeTS: ts => dal.removeBeforeTS(ts),
};

module.exports = service;
