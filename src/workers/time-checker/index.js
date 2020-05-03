const builder = require('../../providers/scheduler');
const { CHECK_AVAILABLE_MESSAGES, CLEAR_OLD_TIMESTAMPS } = require('../../enums/cron-jobs.enum');
const {
  getAvailableTimestamps,
  moveToPublishQueue,
  removeBeforeTS,
} = require('../../services/message.service');

const _checkAvailableMessages = async () => {
  const timestamps = await getAvailableTimestamps();
  if (timestamps.length === 0) return false;
  const result = await moveToPublishQueue(timestamps);
  return result;
};

const _clearOldTimestamps = async () => {
  const yesterday = new Date().valueOf() - 1000 * 60 * 60 * 24;
  const result = await removeBeforeTS(yesterday);
  return result;
};

builder('* * * * * *', _checkAvailableMessages, CHECK_AVAILABLE_MESSAGES);
builder('0 0 * * *', _clearOldTimestamps, CLEAR_OLD_TIMESTAMPS);
