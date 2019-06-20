const express = require('express');
const tempUsers = require('./tempUsers');
const userRouter = express.Router();
const app = require('../app');

userRouter
  .route('/')
  .get((req, res, next) => {
    req.app.get('db')
      .from('users')
      .select('*')
      .then((users) => {
        res.status(200).json(users);
      })
                  
  });


module.exports = userRouter;