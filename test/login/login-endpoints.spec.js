const helpers = require('../test-helpers');
const knex = require('knex');
const app = require('../../src/app');


describe('login endpoints', () => {
  before('make knex instance', () => {
    let db;
    const {
      testUsers,
      testQuotes,
      testSavedQuotes,
    } = helpers.makeMotiv8Fixtures();
  
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);

    return helpers.seedUsersTable(db, testUsers)
  });

  it('POST responds 200', () => {
    let data = {
      username: 'test',
      password: 'password'
    }
    return supertest(app)
            .post('/api/login')
            .send(data)
            .expect(200);
  })
});

