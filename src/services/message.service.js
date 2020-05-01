const dal = require('../dal/message.dal');
const validator = require('../utils/validators.utils');

const service = {
  addToMessages: ({ msg, time }) => {
    const timestamp = validator.addToMessages(msg, time);
    return dal.addToMessages(timestamp, msg);
  },
};

module.exports = service;
