const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc';

// Following function taked two arguments. Its an ASYN function, the second argument is a callback function and the first one is the no of rounds you want to salt(the bigger the no, the longer the time algorithm takes)
// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     //we have to store the hash value in database
//     console.log(hash);
//   });
// });

// To compare whether the typed password matches our old password
var hashedPassword = '$2a$10$FMM6YnR4N58YDmJMLartde/AcsNnelp.2bwo6tTHYhNXRifib1i3C';

bcrypt.compare(password, hashedPassword, (err, result) => {
  console.log(result);
});

// jwt.sign // takes the object (like data{})and signs it. It creates the HASH and returns the token value. Takes the object and secret as an argument and returns a token.
// jwt.verify // is opposite of jwt.sign. It takes the token and secret and makes sure that data was not manipulated
//
// var data = {
//   id: 5
// };
//
// var token = jwt.sign(data, '123abc');
// console.log(token);
//
// var decoded = jwt.verify(token, '123abc');
// console.log(decoded);
