const helpers = require('../test-helpers');
const knex = require('knex');
const app = require('../../src/app');

describe('users endpoints', () => {
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

  after('clean tables', () => helpers.cleanTables(db));


  it('responds with the posted user to create', ()=> {
    let newUser = {
      "username": "new",
      "password": "1234"
    }

    return supertest(app)
            .post('/api/users')
            .send(newUser)
            .expect(201, {
              "id": 1,
              "username": "new"
            });
  });
});
