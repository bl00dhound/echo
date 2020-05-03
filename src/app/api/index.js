const log = require('../../providers/logger');
const messageApi = require('./message.api');

/**
 * This is a primitive routing model.
 */

const root = (_data, cb) => cb(200, 'Echo API.');

const message = (data, cb) => {
  const routeHandler = messageApi[data.method];

  if (!routeHandler) {
    log.warn(data, 'Wrong method');
    return cb(405, { error: 'Wrong method' });
  }

  return routeHandler(data, cb);
};

const notFound = (data, cb) => {
  log.warn(data, 'Route not Found');
  cb(404);
};

module.exports = {
  root,
  message,
  notFound,
};
