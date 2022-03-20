describe('GET /users', () => {
  it('respond with json', (done) => {
    request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});
