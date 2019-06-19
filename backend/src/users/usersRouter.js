const express = require('express');
const tempUsers = require('./tempUsers');
const userRouter = express.Router();


userRouter
  .route('/')
  .get((req, res, next) => {
    res.json(tempUsers);
  });


module.exports = userRouter;