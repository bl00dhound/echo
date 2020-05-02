const Promise = require('bluebird');
const redis = require('redis');

const { redisHost, redisPort, redisDB } = require('../config');
const log = require('./logger');

const client = Promise.promisifyAll(redis).createClient({
  host: redisHost,
  port: redisPort,
  db: redisDB,
});

client.on('connect', () => {
  log.info(`[Redis] connected to Utility Redis client: ${redisHost}:${redisPort} db:${redisDB}`);
});

client.on('error', err => {
  log.error(err);
});

module.exports = client;
