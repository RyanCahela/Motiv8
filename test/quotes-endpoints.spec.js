const helpers = require('./test-helpers');
const knex = require('knex');
const app = require('../src/app');


describe('Quotes Endpoints', function() {

  function printResponse(res) {
    console.log('response raw',res.text);
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
        .expect(printResponse);
    });
  });

  context('Given quotes in db', () => {
    beforeEach('insert quotes', () => helpers.seedQuotesTable(db, testQuotes))

    afterEach('remove quotes', () => helpers.cleanTables(db));

    
    it('responds with 200 and 30 random quotes in correct format', () => {
      return supertest(app)
      .get('/api/quotes')
      .expect('print response', printResponse);
    })



    
  })
});