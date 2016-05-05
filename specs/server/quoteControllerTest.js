import chai from 'chai';
import request from 'request';
import Quote from '../../server/models/quoteModel';
import User from '../../server/models/userModel';
import quoteController from '../../server/controllers/quoteController';
const expect = chai.expect;

describe('Quote Controller', function() {

  var user = {
    name: 'Watson',
    email: 'watson@watson.com',
    password: '1234'
  };
  var quote1 = {
    text: 'The best way to find yourself is to lose yourself in the service of others.',
    mood: 'Happy'
  };
  var quote2 = {
    text: 'Do the best you can, and don\'t take life too serious.',
    mood: 'Sentimental'
  };
  var quote3 = {
    text: 'It\'s a funny thing about life; if you refuse to accept anything but the best, you very often get it.',
    mood: 'Romantic'
  };

  beforeEach(done => {
    User.findOrCreate({where: user})
    .then(() => {
      done();
    });
  });

  it('should add users quote to the database', done => {
    let options = {
      method: 'POST',
      uri: 'http://127.0.0.1:8080/api/quotes/saved',
      json: {
        user: user,
        quote: quote1
      }
    }

    request(options, (err, res, body) => {
      expect(res.statusCode).to.equal(201);
      let options = {
        method: 'GET',
        uri: 'http://127.0.0.1:8080/api/quotes/saved',
        json: {
          user: user
        }
      }

      request(options, (err, res, body) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  it('users should be able to have many quotes', done => {
    let options2 = {
      method: 'POST',
      uri: 'http://127.0.0.1:8080/api/quotes/saved',
      json: {
        user: user,
        quote: quote2
      }
    }
    let options3 = {
      method: 'POST',
      uri: 'http://127.0.0.1:8080/api/quotes/saved',
      json: {
        user: user,
        quote: quote3
      }
    }
    request(options2, (err, res, body) => {
      expect(res.statusCode).to.equal(201);
      request(options3, (err, res, body) => {
        expect(res.statusCode).to.equal(201);
        done();
      });
    });
  });

  it('should get all user quotes', done => {
    let options = {
      method: 'GET',
      uri: 'http://127.0.0.1:8080/api/quotes/saved',
      json: {
        user: user
      }
    }
    request(options, (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      expect(body.length).to.equal(3);
      done();
    });
  });

});
