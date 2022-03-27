const request = require('supertest');
const app = require('./../../app.js');

describe('GET /users', () => {
  it('respond with empty array', (done) => {
    request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect(404)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe('POST /users/:id', () => {})