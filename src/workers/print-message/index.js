const { moveToProcessQueue, printFromProcessQueue } = require('../../services/message.service');

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
