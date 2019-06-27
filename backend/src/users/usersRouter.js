const express = require('express');
const UsersServices = require('./UsersServices');
const path = require('path');
const requireAuth = require('../middleware/jwt-auth');
const savesQuotesServices = require('../save/saveQuoteServices');

const userRouter = express.Router();
const jsonParser = express.json();


userRouter.route('/')
  .all((req, res, next) => {
    this.db = req.app.get('db');
    next();
  })
  .post(jsonParser, (req, res, next) => {
    //create user
    const { username, password } = req.body;
    console.log(username);

    UsersServices.checkIfUserExists(this.db, username)
      .then(userExists => {
        console.log(userExists);
        if(userExists) {
          return res.status(400).json({error: 'Username already taken'});
        }

        return UsersServices.hashPassword(password)
          .then(hashedPassword => {
            const validNewUser = {
              username,
              password : hashedPassword
            }
    
            UsersServices.insertUser(this.db, validNewUser)
              .then(insertedItemsArray => {
                [ newUser ] = insertedItemsArray;
                console.log(newUser);
                res.status(201)
                  .location(path.posix.join(req.originalUrl, `/${newUser.id}`))
                  .json(UsersServices.serializeUser(newUser));
              })
          })
      })
  })

userRouter
  .route('/:userId')
  .all(requireAuth)
  .all((req, res, next) => {
    this.db = req.app.get('db');
    next();
  })
  .get((req, res) => {
    savesQuotesServices.getSavedQuotesById(this.db, req.params.userId)
  })

module.exports = userRouter;