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

  return moveToPublishQueue(timestamps);
};

const _clearOldTimestamps = async () => {
  const yesterday = new Date().valueOf() - 1000 * 60 * 60 * 24;
  const remove = await removeBeforeTS(yesterday);
  return remove;
};

builder('* * * * * *', _checkAvailableMessages, CHECK_AVAILABLE_MESSAGES);
builder('0 0 * * *', _clearOldTimestamps, CLEAR_OLD_TIMESTAMPS);
