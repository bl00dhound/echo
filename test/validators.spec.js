const { expect } = require('chai');

const { addToMessages } = require('../src/utils/validators.utils');

describe('#Validators', () => {

  describe('addToMessages validator', () => {

    it('("", "Tue May 01 2040 18:47:38 GMT") -> Error(Incorrect message)', () => {
      expect(() => addToMessages('', 'Tue May 01 2040 18: 47: 38 GMT')).to.throw('Incorrect message');
    });

    it('("my message") -> Error(Incorrect time)', () => {
      expect(() => addToMessages('my message')).to.throw('Incorrect time');
    });

    it('("my message", "abracadabra") -> Error(Incorrect time)', () => {
      expect(() => addToMessages('my message', 'abracadabra')).to.throw('Incorrect time');
    });

    it('("my message", "Sun, 17 Dec 1995 01:24:00 GMT") -> Error(Incorrect time)', () => {
      expect(() => addToMessages('my message', 'Sun, 17 Dec 1995 01:24:00 GMT')).to.throw('Incorrect time');
    });

    it('("my message", null) -> Error(Incorrect message)', () => {
      expect(() => addToMessages('my message', null)).to.throw('Incorrect time');
    });

    it('("my message", {}) -> Error(Incorrect message)', () => {
      expect(() => addToMessages('my message', {})).to.throw('Incorrect time');
    });

    it('("my message", "Sun, 17 Dec 1995 01:24:00 GMT") -> Error(Incorrect time)', () => {
      expect(() => addToMessages('my message', 'Sun, 17 Dec 1995 01:24:00 GMT')).to.throw('Incorrect time');
    });

    it('("my message", "1995-12-17T03:24:00") -> Error(Incorrect time)', () => {
      expect(() => addToMessages('my message', '1995-12-17T03:24:00')).to.throw('Incorrect time');
    });

    it('("my message", "2040-12-17T03:24:00") -> 2239320240000', () => {
      expect(addToMessages('my message', '2040-12-17T03:24:00')).to.be.equal(2239320240000);
    });
    it('("my message", "Mon, Dec 17, 2040 01:24:00 GMT") -> 2239320240000', () => {
      expect(addToMessages('my message', 'Mon, Dec 17, 2040 01:24:00 GMT')).to.be.equal(2239320240000);
    });

  });

});
