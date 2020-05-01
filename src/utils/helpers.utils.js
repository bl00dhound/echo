const log = require('../providers/logger');

const jsonParse = data => {
  let parsedData = {};
  try {
    parsedData = JSON.parse(data);
  } catch (err) {
    log.error(err, 'parsed error');
  }
  return parsedData;
};

module.exports = {
  jsonParse,
};
