const express = require('express');
const SaveQuoteServices = require('./saveQuoteServices');
const saveQuoteRouter = express.Router();
const jsonParser = express.json();
const requireAuth = require('../middleware/requireAuth');


saveQuoteRouter.route('/')
  .all(requireAuth)
  .post(jsonParser, (req, res) => {
    const {
      backgroundImageUrl,
      quoteId,
      bodyFont,
      authorFont,
      userId
    } = req.body;
    const quoteToInsert = {
      background_image_url: backgroundImageUrl,
      quote_id: quoteId,
      bodyfont: bodyFont,
      authorfont: authorFont,
      user_id: userId
    }
    SaveQuoteServices
      .saveQuote(req.app.get('db'), quoteToInsert)
      .then(quoteThatWasSaved => {
        res.status(201).send();
      })
  })
  .patch(jsonParser, (req, res) => {
    const { id } = req.body;
    delete req.body.id;
    SaveQuoteServices
      .updateSavedQuoteById(req.app.get('db'), id, req.body)
      .then(updatedQuote => {
        res.status(204).send();
      })
  })
  .delete(jsonParser, (req, res) => {
    const { savedQuoteId } = req.body;
    SaveQuoteServices
      .deleteSavedQuoteById(req.app.get('db'), savedQuoteId)
      .then(() => {
        res.status(204).send();
      })
      .catch((err) => {
        res.status(500).send();
      })
  })

saveQuoteRouter.route('/:userId')
  .all(requireAuth)
  .all((req, res, next) => {
    this.db = req.app.get('db');
    next();
  })
  .get((req,res) => {
    SaveQuoteServices
      .getSavedQuotesByUserId(req.app.get('db'), req.params.userId)
      .then(savedQuotes => {
        res.status(200).json(savedQuotes);
      })
  })
module.exports = saveQuoteRouter;