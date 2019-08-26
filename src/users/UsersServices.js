const bcrypt = require('bcryptjs');
const xss = require('xss');
const AuthServices = require('../services/AuthServices');

const UsersServices = {
  checkIfUserExists(dbInstance, username) {
    return dbInstance
    .from('users')
    .select('*')
    .where({'username': username})
    .first() //returns first item in returned array, if array empty returns undefined
    .then(user => {
      return Boolean(user)
    });
  },
  deleteUser(dbInstance, username) {
    return dbInstance
            .from('users')
            .where({'username': username})
            .del();
  },
  getUserByUsername(dbInstance, username) {
    return dbInstance
            .from('users')
            .select('*')
            .where({'username': username})
            .returning('*')
            .then(arr => arr[0]);
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12);
  },
  insertUser(dbInstance, userInfo) {
    return dbInstance
            .from('users')
            .insert(userInfo)
            .returning('*');
  },
  serializeUser(userObj) {
    return {
      id: userObj.id,
      username: xss(userObj.username),
    };
  },
  updateUserByUsername(dbInstance, username, dataToUpdate) {
    return AuthServices.hashPassword(dataToUpdate.password)
            .then(hashedPassword => {
              //update user by username
              return dbInstance
                      .from('users')
                      .where({'username': username})
                      .update({
                        username: dataToUpdate.username,
                        password: hashedPassword
                      })
                      .returning('*')
                      .then(arr => arr[0]);
            });
  }
}

module.exports = UsersServices;