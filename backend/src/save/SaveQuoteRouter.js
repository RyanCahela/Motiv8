const express = require('express');
const SaveQuoteServices = require('./SaveQuoteServices');
const saveQuoteRouter = express.Router();
const jsonParser = express.json();


saveQuoteRouter.route('/')
  .all((req, res, next) => {
    this.db = req.app.get('db');
    next();
  })
  .post(jsonParser, (req, res) => {
    const {
      backgroundImageUrl,
      quoteId,
      bodyFont,
      authorFont,
      userId
    } = req.body;
    const quoteToInsert = {
      backgroundimageurl: backgroundImageUrl,
      quoteid: quoteId,
      bodyfont: bodyFont,
      authorfont: authorFont,
      userid: userId
    }
    SaveQuoteServices
      .saveQuote(this.db, quoteToInsert)
      .then(quoteThatWasSaved => {
        res.status(201).send();
      })
  })
  .patch(jsonParser, (req, res) => {
    const { savedQuoteId } = req.body;
    SaveQuoteServices
      .updateSavedQuoteById(this.db, savedQuoteId, req.body)
      .then(updatedQuote => {
        res.status(204).send();
      })
  })

saveQuoteRouter.route('/:userId')
  .all((req, res, next) => {
    this.db = req.app.get('db');
    next();
  })
  .get((req,res) => {
    SaveQuoteServices
      .getSavedQuotesByUserId(this.db, req.params.userId)
      .then(savedQuotes => {
        res.status(200).json(savedQuotes);
      })
  })

module.exports = saveQuoteRouter;