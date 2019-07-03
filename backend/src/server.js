const app = require('./app');
const knex = require('knex');

const PORT = process.env.PORT || 8000

let db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

app.set('db', db);

app.listen(PORT);