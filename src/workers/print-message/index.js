const { moveToProcessQueue, printFromProcessQueue } = require('../../services/message.service');

/**
 * Worker checks publish_queue. If message exists, it moves to process_server_queue and tries
 * to print.
 */
const worker = {
  start: async () => {
    await printFromProcessQueue();

    setInterval(async () => {
      const message = await moveToProcessQueue();
      if (!message) return false;
      return printFromProcessQueue();
    }, 100);
  },
};

module.exports = worker;
