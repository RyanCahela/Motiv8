const bcrypt = require('bcryptjs');
const xss = require('xss');

const UsersServices = {
  getUserByUsername(dbInstance, username) {
    return dbInstance
            .from('users')
            .select('*')
            .where({'username': username})
  },
  insertUser(dbInstance, userInfo) {
    return dbInstance
            .from('users')
            .insert(userInfo)
            .returning('*')
  },
  checkIfUserExists(dbInstance, username) {
    return dbInstance
            .from('users')
            .select('*')
            .where({'username': username})
            .first() //returns first item in returned array, if array empty returns undefined
            .then(user => {
              return Boolean(user)
            })
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12);
  },
  serializeUser(userObj) {
    return {
      id: userObj.id,
      username: xss(userObj.username),
    }
  }
}

module.exports = UsersServices;