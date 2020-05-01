const redis = require('../providers/redis');
const error = require('../utils/errors.utils');
const { MESSAGE_TREE_SET } = require('../enums/redis-stores.enum');

const dal = {
  addToMessages: async (timestamp, msg) => {
    const result = await redis.zaddAsync(MESSAGE_TREE_SET, timestamp, msg);
    if (!result || result === 'nil') {
      throw Error(error.notAddedMsg);
    }
    return true;
  },
};

module.exports = dal;
