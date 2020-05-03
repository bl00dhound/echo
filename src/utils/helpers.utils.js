/* eslint-disable no-console */
const os = require('os');
const log = require('../providers/logger');
const { PROCESS_QUEUE } = require('../enums/redis-stores.enum');

// safe JSON.parse
const jsonParse = data => {
  let parsedData = {};
  try {
    parsedData = JSON.parse(data);
  } catch (err) {
    log.error(err, 'parsed error');
  }
  return parsedData;
};

// print message to stdout
const printMessage = message => {
  console.log(
    '\x1b[35m%s\x1b[0m',
    '************************************ MESSAGE **************************************',
  );
  console.log('\x1b[32m%\x1b[0m', new Date().valueOf());
  console.log('\x1b[32m%\x1b[0m', message);
  console.log(
    '\x1b[35m%s\x1b[0m',
    '***********************************************************************************',
  );
};

// build process_queue name based on instance hostname and PID
const getProcessQueueName = () => `${PROCESS_QUEUE}_${os.hostname}_${process.pid}`;

module.exports = {
  jsonParse,
  getProcessQueueName,
  printMessage,
};
