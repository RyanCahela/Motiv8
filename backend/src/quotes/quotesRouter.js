const express = require('express');

const quotesRouter = express.Router();
const jsonParser = express.json();
const tempQuotes = require('./tempQuotes.js');

quotesRouter
  .route('/')
  .get((req, res, next) => {

    const randomNumArray = generateRandomNumArrayWithLength(30);

    console.log(randomNumArray);

    req.app.get('db')
      .from('quotes')
      .select('*')
      .whereIn('id', randomNumArray)
      .then(quotes => {
        res.status(200).json(quotes)
      });

    function generateRandomNumArrayWithLength(length) {
      const ID_RANGE = 11000
      return Array.from({length: length}, () => Math.floor(Math.random() * ID_RANGE));
    }
  })

module.exports = quotesRouter;