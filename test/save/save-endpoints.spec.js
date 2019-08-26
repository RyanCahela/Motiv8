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
  });

  after('disconnect from db', () => db.destroy());

  context('given there are quotes in db', () => {
    beforeEach('seed users table', () => {
      return helpers.seedUsersTable(db, testUsers);
    });

    beforeEach('seed quotes table', () => {
      return helpers.seedQuotesTable(db, testQuotes);
    });

    beforeEach('seed saveQuotes into table', () => {
      return helpers.seedSaveQuotesTable(db, testSavedQuotes);
    });

    afterEach('clean tables', () => {
      return helpers.cleanTables(db);
    });

    it('PATCH responds with 204', ()=> {
      let data = {
        "id": 1,
        "quote_id": "2",
        "user_id": "1"
      };
      return helpers.loginAsTestUser(app)
              .then(authToken => {
                return supertest(app)
                        .patch('/api/savedQuotes')
                        .set('Authorization', `bearer ${authToken}`)
                        .send(data)
                        .expect(204);
              });
    });

    it('POST responds with 201 and created saveQuote', () => {
      let data = {
        authorFont: "Playfair Display, serif",
        backgroundImageUrl: "https://images.unsplash.com/photo-1559439226-08cc38293b8b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjc2Mjg1fQ",
        bodyFont: "PT Sans",
        quoteId: 3,
        userId: 1
      };
      const expectedData = {
          id: 6,
          authorFont: "Playfair Display, serif",
          backgroundImageUrl: "https://images.unsplash.com/photo-1559439226-08cc38293b8b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjc2Mjg1fQ",
          bodyFont: "PT Sans",
          quoteId: 3,
          userId: 1
      };
      return helpers.loginAsTestUser(app)
              .then(authToken => {
                return supertest(app)
                        .post('/api/savedQuotes')
                        .set('Authorization', `bearer ${authToken}`)
                        .send(data)
                        .expect(201)
                        .then(response => {
                          expect(response.body).to.deep.equal(expectedData);
                        })
                        .catch(err => {throw new Error(err)});
              });
    });

    it('DELETE responds with 204', () => {
      let data = {savedQuoteId: 2};
      return helpers.loginAsTestUser(app)
              .then(authToken => {
                return supertest(app)
                        .delete('/api/savedQuotes')
                        .set('Authorization', `bearer ${authToken}`)
                        .send(data)
                        .expect(204)
              });
    });

    it('GET :userId responds 200 and array of savedQuotes for user', () => {
      const expectedData = [
        {
          authorfont: 'Playfair Display, serif',
          background_image_url: 'https://images.unsplash.com/photo-1559439226-08cc38293b8b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjc2Mjg1fQ"',
          bodyfont: 'PT Sans, sans-serif',
          quote_id: 1,
          id: 3,
          quote: 'Far better to think historically, to remember the lessons of the ' +
            'past. Thus, far better to conceive of power as consisting in part ' +
            'of the knowledge of when not to use all the power you have. Far ' +
            'better to be one who knows that if you reserve the power not to use ' +
            'all your power, you will lead others far more successfully and ' +
            'well.',
          author: 'A Bartlett Giamatti',
          user_id: 1
        },
        {
          authorfont: 'Playfair Display, serif',
          background_image_url: 'https://images.unsplash.com/photo-1559439226-08cc38293b8b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjc2Mjg1fQ"',
          bodyfont: 'PT Sans, sans-serif',
          quote_id: 1,
          id: 2,
          quote: 'Far better to think historically, to remember the lessons of the ' +
            'past. Thus, far better to conceive of power as consisting in part ' +
            'of the knowledge of when not to use all the power you have. Far ' +
            'better to be one who knows that if you reserve the power not to use ' +
            'all your power, you will lead others far more successfully and ' +
            'well.',
          author: 'A Bartlett Giamatti',
          user_id: 1
        },
        {
          authorfont: 'Playfair Display, serif',
          background_image_url: 'https://images.unsplash.com/photo-1559439226-08cc38293b8b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjc2Mjg1fQ"',
          bodyfont: 'PT Sans, sans-serif',
          quote_id: 1,
          id: 1,
          quote: 'Far better to think historically, to remember the lessons of the ' +
            'past. Thus, far better to conceive of power as consisting in part ' +
            'of the knowledge of when not to use all the power you have. Far ' +
            'better to be one who knows that if you reserve the power not to use ' +
            'all your power, you will lead others far more successfully and ' +
            'well.',
          author: 'A Bartlett Giamatti',
          user_id: 1
        }
      ];
      return helpers.loginAsTestUser(app)
              .then(authToken => {
                return supertest(app)
                        .get('/api/savedQuotes/test')
                        .set('Authorization', `bearer ${authToken}`)
                        .expect(200)
                        .then(response => {
                          expect(response.body).to.deep.equal(expectedData);
                        })
                        .catch(err => {throw new Error(err)});
              });
    });
  });
});
