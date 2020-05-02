/* eslint-disable no-console */
const os = require('os');
const log = require('../providers/logger');
const { PROCESS_QUEUE } = require('../enums/redis-stores.enum');

const jsonParse = data => {
  let parsedData = {};
  try {
    parsedData = JSON.parse(data);
  } catch (err) {
    log.error(err, 'parsed error');
  }
  return parsedData;
};

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

const getProcessQueueName = () => `${PROCESS_QUEUE}_${os.hostname}_${process.pid}`;

module.exports = {
  jsonParse,
  getProcessQueueName,
  printMessage,
};
