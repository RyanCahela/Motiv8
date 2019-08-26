const AuthServices = require('../services/AuthServices');
const UsersServices = require('../users/UsersServices');

const requireAuth = (req, res, next) => {
  const authToken = req.get('Authorization') || '';
  let bearerToken;
  if (!authToken.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'Missing bearer token'})
  } else {
    bearerToken = authToken.slice(7, authToken.length)
  }

  try {
    const payload = AuthServices.verifyJwt(bearerToken);
    UsersServices.getUserByUsername(req.app.get('db'), payload.sub)
      .then(foundUser => {
        if(!foundUser.hasOwnProperty('id')) return res.status(401).json({error: 'Unauthorized request'})
        req.user = foundUser;
        next();
      })
  } 
  catch(error) {
    res.status(401).json({error: 'Unauthorized request'})
  }
}

module.exports = requireAuth;

