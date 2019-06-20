const express = require('express');
const SaveQuoteServices = require('./SaveQuoteServices');

const saveQuoteRouter = express.Router();
const jsonParser = express.json();


saveQuoteRouter.route('/')
  .post(jsonParser, (req, res, next) => {
    SaveQuoteServices
      .saveQuote(res.app.get('db'), req.body.userid)
      .then(quoteThatWasSaved => {
        res.status(201).send();
      })
  })
  .patch(jsonParser, (req, res, next) => {
    SaveQuoteServices
      .updateSavedQuoteById(req.app.get('db'), req.body.id, req.body)
      .then(updatedQuote => {
        res.status(204).send();
      })
  })

saveQuoteRouter.route('/:userId')
  .get((req,res, next) => {
    SaveQuoteServices
      .getSavedQuotesByUserId(req.app.get('db'), req.params.userId)
      .then(savedQuotes => {
        res.status(200).json(savedQuotes);
      })
  })

module.exports = saveQuoteRouter;