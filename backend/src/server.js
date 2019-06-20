const app = require('./app');
const knex = require('knex');

let db = knex({
  client: 'pg',
  connection: process.env.DB_URL
});

app.set('db', db);

app.listen(8000, ()=> {
  console.log('server is listening at http://localhost:8000');
});