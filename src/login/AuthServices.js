const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AuthServices = {
  verifyJwt(token) {
    return jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256']
    })
  },
  createJwt(subject, payload) {
    return jwt.sign(
      payload, 
      process.env.JWT_SECRET, 
      {
        subject: subject,
        algorithm: 'HS256'
      });
  },
  getUserByUsername(dbInstance, username) {
    return dbInstance
            .from('users')
            .select('*')
            .where({'username': username})
            .then(queryArray => {
              return queryArray[0];
            });
  },
  comparePasswords(string, hash) {
    return bcrypt.compare(string, hash)
  }
}

module.exports = AuthServices;