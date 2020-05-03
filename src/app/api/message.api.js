const log = require('../../providers/logger');
const service = require('../../services/message.service');

/**
 * I have only one endpoint:
 * curl --location --request POST 'localhost:3000/message' \
      --header 'Content-Type: application/json' \
      --data-raw '{
          "msg": "the awesome message",
          "time": 1589322731352
      }'
 */

const post = async (data, cb) => {
  const { payload } = data;
  try {
    await service.addToMessages(payload);
    cb(201, '{ "ok": true }');
  } catch (e) {
    log.warn({ ...data, stack: e.stack || '' }, e.message);
    cb(400, e.message || '');
  }
};

module.exports = {
  post,
};
