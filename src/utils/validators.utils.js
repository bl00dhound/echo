const errors = require('./errors.utils');

const addToMessages = (msg, time) => {
  if (!msg) throw new Error(errors.noMessage);
  if (!time) throw new Error(errors.noTime);
  const now = new Date().valueOf();
  const convertedTime = new Date(time).valueOf();

  if (now >= convertedTime || Number.isNaN(convertedTime)) throw new Error(errors.noTime);

  return convertedTime;
};

module.exports = {
  addToMessages,
};
