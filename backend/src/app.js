require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const quotesRouter = require('./quotes/quotesRouter');
const usersRouter = require('./users/usersRouter');
const saveQuoteRouter = require('./save/SaveQuoteRouter.js');
const loginRouter = require('./login/loginRouter')

const app = express();

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'

app.use(cors());
app.use(morgan(morganSetting))
app.use(helmet());
app.use('/api/login', loginRouter);
app.use('/api/quotes', quotesRouter);
app.use('/api/users', usersRouter);

//protectedRoute
app.use('/api/savedQuotes', saveQuoteRouter);

app.use((error, req, res, next) => {
  let response;
  if(process.env.NODE_ENV === 'production') {
    response = { error: { message: 'server error' }}
  } else {
    response = { error }
  }
  res.status(500).json(response);
});

module.exports = app;





