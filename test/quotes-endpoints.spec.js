const helpers = require('./test-helpers');
const knex = require('knex');
const app = require('../src/app');


describe('Quotes Endpoints', function() {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  })



  context('Given no quotes in db', () => {
    it('responds with 200 and an empty list', () => {
      return supertest(app)
        .get('/api/quotes')
        .expect(200, []);
    });
  });
});