const config = {
  logLevel: process.env.LOG_LEVEL || 'info',
  apiPort: process.env.API_PORT || 3000,
  redisHost: process.env.REDIS_HOST || 'localhost',
  redisPort: process.env.REDIS_PORT || 6379,
  redisDB: process.env.REDIS_DB || 1,
};

module.exports = config;
