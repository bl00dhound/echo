const pino = require('pino');

const config = require('../config');

/**
 * Simple and fast logger.
 */

module.exports = pino({
  level: config.logLevel,
});
