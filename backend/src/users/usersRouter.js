const express = require('express');
const UsersServices = require('./UsersServices');

const userRouter = express.Router();
const jsonParser = express.json();


userRouter.route('/')
  .all((req, res, next) => {
    this.db = req.app.get('db');
    next();
  })
  .post(jsonParser, (req, res, next) => {
    const { username, password } = req.body;

    const validNewUser = {
      username,
      password
    }
    UsersServices.createUser(this.db, validNewUser)
      .then((newUser) => {
        res.status(201).json(newUser);
      })
  })


userRouter
  .route('/:username')
  .all((req, res, next) => {
    this.db = req.app.get('db');
    next();
  })
  .get((req, res, next) => {
    const { username } = req.params;
    UsersServices.getUserByUsername(this.db, username)
      .then((users) => {
        res.status(200).json(users);
      })
  })

module.exports = userRouter;