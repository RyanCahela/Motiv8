const helpers = require('../test-helpers');
const knex = require('knex');
const app = require('../../src/app');


describe('Save Endpoints', () => {
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

    return helpers.seedUsersTable(db, testUsers)
  })

  before('seed quotes', () => {
    return helpers.seedQuotesTable(db, testQuotes);
  })

  after('disconnect from db', () => db.destroy());

  context('given there are quotes in db', () => {
    beforeEach('seed saveQuotes into table', () => {
      return helpers.seedSaveQuotesTable(db, testSavedQuotes);
    })

    afterEach('clean tables', () => {
      return helpers.cleanTables(db);
    });

    it('PATCH responds with 204', ()=> {
      let data = {
        authorfont: "Playfair Display, serif",
        background_image_url: 'https://images.unsplash.com/photo-1559439226-08cc38293b8b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjc2Mjg1fQ"',
        bodyfont: "PT Sans, sans-serif",
        quote_id: quote.id,
        user_id: userId
      }
      return supertest(app)
              .post('/saveQuotes/')
              .send(data)
              .expect(204);
              
    });
  });
});
