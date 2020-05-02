const log = require('../../providers/logger');
const service = require('../../services/message.service');

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
