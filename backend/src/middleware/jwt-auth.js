const AuthServices = require('../login/AuthServices');

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

    AuthServices.getUserByUsername(req.app.get('db'), payload.sub)
      .then(user => {
        if(!user) {
          return res.status(401).json({error: 'Unauthorized request'})
        }
        console.log('this should be seen');
        req.user = user;
        next();
      })
  } 
  catch(error) {
    res.status(401).json({error: 'Unauthorized request'})
  }
}

module.exports = requireAuth;

