const redis = require('../src/providers/redis');
const { TIMESTAMP_TREE_SET } = require('../src/enums/redis-stores.enum');

const getFirstFromTimestampts = () => redis.zrangeAsync(TIMESTAMP_TREE_SET, 0, 0);

const clearAll = () => redis.flushallAsync();

const getLastMessageFromList = timestamp => redis.lindexAsync(timestamp, -1);

module.exports = {
  getFirstFromTimestampts,
  clearAll,
  getLastMessageFromList,
};
