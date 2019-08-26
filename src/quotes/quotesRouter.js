const express = require('express');
const QuoteServices = require('./QuoteServices');
const quotesRouter = express.Router();
const jsonParser = express.json();


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
  .post(jsonParser, (req, res, next) => {
    const {
      //must have values
      category,
      quote,
      author,
    } = req.body;
    QuoteServices.insertQuote(req.app.get('db'), req.body)
      .then(insertedQuote => {
        res.status(201).json(insertedQuote);
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    QuoteServices.updateQuote(req.app.get('db'), req.body)
      .then(updatedQuote => {
        res.status(204).send();
      })
      .catch(next);
  })

quotesRouter
  .route('/:quoteId')
  .delete((req, res, next) => {
    let id = req.params.quoteId;
    QuoteServices.deleteQuote(req.app.get('db'), id)
      .then(deletedQuote => {
        res.status(204).send();
      })
      .catch(next)
  })

module.exports = quotesRouter;