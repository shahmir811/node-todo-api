var {User} = require('./../models/User');

var authenticate = (req, res, next) => {
  var token = req.header('x-auth'); //Getting the header

  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject(); // it will move execution to the error block
    }

    req.user = user;
    req.token = token;
    next();

  }).catch((err) => {
    res.status(401).send(); //401 means that authentication is required
  });

};

module.exports = {authenticate};
