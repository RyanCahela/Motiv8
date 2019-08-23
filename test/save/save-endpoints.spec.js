const helpers = require('../test-helpers');
const knex = require('knex');
const app = require('../../src/app');
const UsersServices = require('../../src/users/UsersServices')


describe('Save Endpoints', () => {
  let db;
  let authToken;
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

    return helpers.seedUsersTable(db, testUsers);
  })

  before('get auth token', () => {
    let loginData = {
      username: 'test',
      password: 'password',
    }
    return supertest(app)
      .post('/api/login')
      .send(loginData)
      .then(json => {
        authToken = json.body.authToken;
      });
  })

  after('disconnect from db', () => db.destroy());

  context('given there are quotes in db', () => {
    beforeEach('seed users table', () => {
      return helpers.seedUsersTable(db, testUsers);
    });

    beforeEach('seed quotes', () => {
      return helpers.seedQuotesTable(db, testQuotes);
    });

    beforeEach('seed saveQuotes into table', () => {
      return helpers.seedSaveQuotesTable(db, testSavedQuotes);
    });



    afterEach('clean tables', () => {
      return helpers.cleanTables(db);
    });

    it('PATCH responds with 204', ()=> {
      let auth = {

      }
      let data = {
        "id": 1,
        // "authorfont": "Playfair Display, serif",
        // "background_image_url": "https://images.unsplash.com/photo-1559439226-08cc38293b8b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjc2Mjg1fQ",
        // "bodyfont": "PT Sans",
        "quote_id": "2",
        "user_id": "1"
      }
      return supertest(app)
              .patch('/api/savedQuotes')
              .set('Authorization', `bearer ${authToken}`)
              .send(data)
              .expect(204);
    });

    it('POST responds with 201', () => {
      let data = {
        authorFont: "Playfair Display, serif",
        backgroundImageUrl: "https://images.unsplash.com/photo-1559439226-08cc38293b8b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjc2Mjg1fQ",
        bodyFont: "PT Sans",
        quoteId: 3,
        userId: 1
      }
      return supertest(app)
              .post('/api/savedQuotes')
              .set('Authorization', `bearer ${authToken}`)
              .send(data)
              .expect(201);
    });

    it('DELETE responds with 204', () => {
      let data = {savedQuoteId: 2};
      return supertest(app)
              .delete('/api/savedQuotes')
              .set('Authorization', `bearer ${authToken}`)
              .send(data)
              .expect(204)
    })

    it('GET :userId responds 200', () => {
      return supertest(app)
              .get('/api/savedQuotes/1')
              .set('Authorization', `bearer ${authToken}`)
              .expect(200);
    })
  });
});
