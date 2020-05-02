const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

const router = require('./api');
const { apiPort } = require('../config');
const Routes = require('../enums/routes.enum');
const log = require('../providers/logger');
const { jsonParse } = require('../utils/helpers.utils');
const printer = require('../workers/print-message');

const server = (req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  const trimmedPathname = pathname.replace(/^\/+|\/+$/g, '') || Routes.ROOT;
  const method = req.method.toLowerCase();
  const { headers } = req;

  const decoder = new StringDecoder('utf-8');
  let buffer = '';

  req.on('data', data => {
    buffer += decoder.write(data);
  });

  req.on('end', () => {
    buffer += decoder.end();

    const currentHandler = router[trimmedPathname] ? router[trimmedPathname] : router.notFound;
    const data = {
      trimmedPathname,
      method,
      headers,
      qs: query,
      payload: jsonParse(buffer),
    };

    currentHandler(data, (statusCode, payload) => {
      const checkedStatusCode = typeof statusCode === 'number' ? statusCode : 200;
      // const checkedPayload = payload ? JSON.stringify(payload) : '';

      res.setHeader('Content-Type', 'application/json');
      res.writeHead(checkedStatusCode);
      // res.end(checkedPayload);
      res.end(payload);
      // log.info(`Returning this response: ${checkedStatusCode} ${checkedPayload}`);
      log.info(`Returning this response: ${checkedStatusCode} ${payload}`);
    });
  });
};

printer.start();
const httpServer = http.createServer(server);

httpServer.listen(apiPort, () => {
  log.info(`HTTP server is started on ${apiPort} port.`);
});

module.exports = httpServer;
