const builder = require('../../providers/scheduler');
const { CHECK_AVAILABLE_MESSAGES } = require('../../enums/cron-jobs.enum');
const { getAvailableTimestamps, moveToPublishQueue } = require('../../services/message.service');

const _checkAvailableMessages = async () => {
  const timestamps = await getAvailableTimestamps();
  if (timestamps.length === 0) return false;

  return moveToPublishQueue(timestamps);
};

builder('* * * * * *', _checkAvailableMessages, CHECK_AVAILABLE_MESSAGES);
