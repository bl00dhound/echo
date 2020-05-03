const Promise = require('bluebird');

const { PUBLISH_QUEUE } = require('../enums/redis-stores.enum');
const dal = require('../dal/message.dal');
const validator = require('../utils/validators.utils');
const { getProcessQueueName, printMessage } = require('../utils/helpers.utils');
const log = require('../providers/logger');

// get server name, for process_queue identification
const PROCESS_QUEUE_NAME = getProcessQueueName();

/**
 * Service - level of application. It provides the logic of adding messages,
 * moving messages between queues.
 */

const service = {
  // Add message, checks if time is correct.
  // Possible values are string or number which native Date constructor accepts.
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date
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

  // Move message to process_queue. It provides atomic moving by RPOPLPUSH.
  // https://redis.io/commands/rpoplpush
  moveToProcessQueue: () => dal.moveToAnotherQueue(PUBLISH_QUEUE, PROCESS_QUEUE_NAME),

  // Print message if it exist in queue.
  printFromProcessQueue: async () => {
    const message = await dal.popMessageFromProcessQueue(PROCESS_QUEUE_NAME);
    if (!message) return false;
    return printMessage(message);
  },

  // Move message to publish_queue. It provides atomic moving by RPOPLPUSH.
  // https://redis.io/commands/rpoplpush
  moveToPublishQueue: async (timestamps = []) => {
    let counter = 0;
    await Promise.map(timestamps, async ts => {
      let hasNext = true;

      while (hasNext) {
        const message = await dal.moveToAnotherQueue(ts, PUBLISH_QUEUE);
        if (!message) {
          await dal.removeTimestamp(ts);
          hasNext = false;
        } else counter++;
      }
    });
    return counter;
  },
  // Remove old timestamps, before timestamp that pass as argument
  removeBeforeTS: ts => dal.removeBeforeTS(ts),
};

module.exports = service;
