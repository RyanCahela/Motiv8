const express = require('express');

const quotesRouter = express.Router();
const jsonParser = express.json();
const tempQuotes = require('./tempQuotes.js');

quotesRouter
  .route('/')
  .get((req, res, next) => {
    res.json(tempQuotes);
  })

module.exports = quotesRouter;