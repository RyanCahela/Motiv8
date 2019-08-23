const express = require('express');
const QuoteServices = require('./QuoteServices');
const quotesRouter = express.Router();

quotesRouter
  .route('/')
  .get((req, res, next) => {
    const randomNumArray = generateRandomNumArrayWithLength(30);
    QuoteServices.getQuotesByIdArray(req.app.get('db'), randomNumArray)
      .then(quotes => {
        res.status(200).json(quotes);
      })
      .catch(next);

    function generateRandomNumArrayWithLength(length) {
      const ID_RANGE = 5000;
      return Array.from({length: length}, () => Math.floor(Math.random() * ID_RANGE));
    }
  })
  .post(() => {
    Quote
  })

module.exports = quotesRouter;