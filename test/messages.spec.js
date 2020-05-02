require('dotenv').config();
process.env.REDIS_DB = 3;

const chaiHTTP = require('chai-http');
const chai = require('chai');
chai.use(chaiHTTP);
const expect = chai.expect;

const {
  getFirstFromTimestampts,
  clearAll,
  getLastMessageFromList,
} = require('./test.utils');
const app = require('../src/app');

describe('#Messages', () => {
  describe('Check adding message', () => {

    it('Should create item in sorted set', done => {
      chai.request(app)
        .post('/message')
        .send({
          'msg': 'the test message',
          'time': 2239320240005,
        })
        .end(async (_err, res) => {
          expect(res.ok).to.be.ok;
          const result = await getFirstFromTimestampts();
          expect(result[0]).to.be.equal('2239320240005');
          done();
        });
    });

    it('Should store message in the list', async () => {
      const message = await getLastMessageFromList('2239320240005');
      expect(message).to.be.equal('the test message');
    });


  });

  after(clearAll);
});