const helpers = require('../test-helpers');
const knex = require('knex');
const app = require('../../src/app');


describe('Quotes Endpoints', function() {
  function printResponse(res) {
    
  }
  let db;
  const {
    testUsers,
    testQuotes,
    testSavedQuotes,
  } = helpers.makeMotiv8Fixtures();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  })

  after('disconnect from db', () => db.destroy());

  context('Given no quotes in db', () => {
    it('responds with 200 and an empty list', () => {
      return supertest(app)
        .get('/api/quotes')
        .expect(200);
    });
  });

  context('Given quotes in db', () => {
    beforeEach('insert quotes', () => helpers.seedQuotesTable(db, testQuotes));

    afterEach('remove quotes', () => helpers.cleanTables(db));

    it('responds with 200', () => {
      return supertest(app)
      .get('/api/quotes')
      .expect(200)
      .then(response => {
        console.log('json', response.body);
      })
    });
  });
});