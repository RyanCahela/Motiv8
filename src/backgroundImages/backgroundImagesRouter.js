const express = require('express');
const FetchServices = require('../services/FetchServices');
const backgroundImagesRouter = express.Router();


backgroundImagesRouter
  .route('/:count')
  .get((req, res, next) => {
    let count = req.params.count
    if(req.params.count > 100) count = 99; //unsplash limits api request to 100.
    FetchServices.getBackgroundImageUrls(count)
      .then(unsplashRes => {
        res.status(200).json(unsplashRes.data);
      })
      .catch(err => {throw new Error(err)});
  });

module.exports = backgroundImagesRouter;