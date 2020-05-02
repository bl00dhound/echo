const redis = require('../providers/redis');
const { TIMESTAMP_TREE_SET } = require('../enums/redis-stores.enum');

const dal = {
  addTimestamp: async timestamp => {
    const result = await redis.zaddAsync(TIMESTAMP_TREE_SET, timestamp, timestamp);

    return Boolean(result);
  },
  addToMessages: (timestamp, msg) => redis.lpushAsync(timestamp, msg),
  getTimestampsByNow: now => redis.zrangebyscoreAsync(TIMESTAMP_TREE_SET, 0, now),
  moveToAnotherQueue: (src, dest) => redis.rpoplpushAsync(src, dest),
  popMessageFromProcessQueue: list => redis.rpopAsync(list),
};

module.exports = dal;
