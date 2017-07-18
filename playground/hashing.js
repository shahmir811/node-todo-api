const jwt = require('jsonwebtoken');

jwt.sign // takes the object (like data{})and signs it. It creates the HASH and returns the token value. Takes the object and secret as an argument and returns a token.
jwt.verify // is opposite of jwt.sign. It takes the token and secret and makes sure that data was not manipulated

var data = {
  id: 5
};

var token = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token, '123abc');
console.log(decoded);
