const express = require('express');
const QuotesServices = require('./QuotesServices');

const quotesRouter = express.Router();

quotesRouter
  .route('/')
  .get((req, res, next) => {

    const randomNumArray = generateRandomNumArrayWithLength(30);

    QuotesServices.getQuotesByIdArray(req.app.get('db'), randomNumArray)
      .then(quotes => {
        res.status(200).json(quotes)
      })
      .catch(next);

    function generateRandomNumArrayWithLength(length) {
      const ID_RANGE = 11000
      return Array.from({length: length}, () => Math.floor(Math.random() * ID_RANGE));
    }
  })

module.exports = quotesRouter;