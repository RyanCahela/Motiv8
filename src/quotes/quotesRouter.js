const express = require('express');
const QuotesServices = require('./QuotesServices');
const quotesRouter = express.Router();

quotesRouter
  .route('/')
  .get((req, res, next) => {

    const randomNumArray = generateRandomNumArrayWithLength(30);
    console.log('randomNUmArray', randomNumArray);
    QuotesServices.getQuotesByIdArray(req.app.get('db'), randomNumArray)
      .then(quotes => {
        console.log('quotes', quotes);
        res.status(200).json(quotes);
      })
      .catch(next);

    function generateRandomNumArrayWithLength(length) {
      const ID_RANGE = 5000;
      return Array.from({length: length}, () => Math.floor(Math.random() * ID_RANGE));
    }
  })

module.exports = quotesRouter;