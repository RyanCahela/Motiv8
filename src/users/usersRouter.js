const express = require('express');
const UsersServices = require('./UsersServices');
const AuthServices = require('../services/AuthServices');
const path = require('path');
const requireAuth = require('../middleware/requireAuth');
const SaveQuoteServices = require('../save/saveQuoteServices');
const userRouter = express.Router();
const jsonParser = express.json();

//Public Routes
userRouter.route('/')
  .all((req, res, next) => {
    this.db = req.app.get('db');
    next();
  })
  .post(jsonParser, (req, res, next) => {
    //Create User
    const { username, password } = req.body;

    UsersServices.checkIfUserExists(this.db, username)
      .then(userExists => {
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
                res.status(201)
                  .location(path.posix.join(req.originalUrl, `/${newUser.id}`))
                  .json(UsersServices.serializeUser(newUser));
              })
          })
      })
  })

userRouter.route('/login')
  .post(jsonParser, (req, res, next) => {
    let jwtPayload = { userId: undefined };
    const { username, password } = req.body;
    const postedCredentials = { username, password };
    for (const [key, value] of Object.entries(postedCredentials)) {
      if(!value) {
        return res.status(400).json({
          error: `missing ${key} in request body`
        });
      }
    }
    //grab user obj from db
    UsersServices.getUserByUsername(req.app.get('db'), username)
      .then(dbUser => {
        if(!dbUser || !dbUser.hasOwnProperty('id')) {
          res.status(400).json({error: 'Incorrect username'})
          throw new Error('Incorrect username');
        }
        jwtPayload.userId = dbUser.id;
        //verify req password matches password stored in db.
        return AuthServices.comparePasswords(postedCredentials.password, dbUser.password);
      })
      .then(passwordIsMatch => {
        if(!passwordIsMatch) {
          res.status(400).json({error: 'Incorrect password'});
          throw new Error('Incorrect password');
        };
        const subject = username;
        //send jwt back to client
        let token = AuthServices.createJwt(subject, jwtPayload)
        res.status(200).json({
          authToken: token,
        });
      })
      .catch(err => console.error(err));
  });

//Protected Routes
userRouter.route('/:username')
  .all((req, res, next) => {
    this.db = req.app.get('db');
    next();
  })
  .all(requireAuth)
  .get((req, res, next) => {
    UsersServices.getUserByUsername(req.app.get('db'), req.user.username)
      .then(foundUser => {
        if(!foundUser.hasOwnProperty('id')) return res.status(404).send();
        const {id, username} = foundUser;
        res.status(200).json({id, username});
      });
  })
  .patch(jsonParser, (req, res, next) => {
    UsersServices.updateUserByUsername(this.db, req.user.username, req.body)
      .then(updatedUser => {
        if(!updatedUser.hasOwnProperty('id')) return res.status(404).send();
        const { id, username } = updatedUser;
        res.status(200).json({ id, username });
      });
  })
  .delete((req, res, next) => {
    UsersServices.deleteUser(this.db, req.user.username)
      .then(numberOfDeletedUsers => {
        if(numberOfDeletedUsers != 1)  return res.status(404).send();
        res.status(204).send();
      });
  });

module.exports = userRouter;