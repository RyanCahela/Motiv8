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

  beforeEach('seed users table', () => helpers.seedUsersTable(db, testUsers));

  afterEach('clean tables', () => helpers.cleanTables(db));

  it('POST responds with 201 and the new created user', ()=> {
    let newUser = {
      "username": "new",
      "password": "1234"
    }

    let expectedResponse = {
      id: 3,
      username: "new",
    }

    return supertest(app)
            .post('/api/users')
            .send(newUser)
            .expect((res) => {
              return expect(res.body).to.deep.equal(expectedResponse);
            })
            .expect(201)
            .catch(err => {throw new Error(err)})
  });

  it('POST /login responds 200', () => {
    let data = {
      username: 'test',
      password: 'password'
    }
    return supertest(app)
            .post('/api/users/login')
            .send(data)
            .expect(200);
  })

  it('AUTH GET responds with 200 and the found user', () => {
    const expectedResponse = {
      id: 1,
      username: 'test'
    }

    return helpers.loginAsTestUser(app)
            //actual test
            .then(authToken => {
              return supertest(app)
                    .get('/api/users/test')
                    .set('Authorization', `bearer ${authToken}`)
                    .expect(res=> {
                      return expect(res.body).to.deep.equal(expectedResponse)
                    })
                    .catch(err => {throw new Error(err)});
            });
  });

  it('AUTH PATCH responds with 200 and updated username', () => {
    const expectedResponse = {
      username: 'newUsername'
    }

    return helpers.loginAsTestUser(app)
            .then(authToken => {
              return supertest(app)
                      .patch('/api/users/test')
                      .set('Authorization', `bearer ${authToken}`)
                      .send({
                        username: 'newUsername',
                        password: 'password'
                      })
                      .expect(res => {
                        return expect(res.body).to.deep.equal(expectedResponse);
                      })
                      .expect(200)
                      .catch(err => {throw new Error(err)});
            });
  });
  it('AUTH DELETE responds with 204', () => {
    return helpers.loginAsTestUser(app)
            .then(authToken => {
              return supertest(app)
                      .delete('/api/users/test')
                      .set('Authorization', `bearer ${authToken}`)
                      .expect(204)
            });
  });
});
