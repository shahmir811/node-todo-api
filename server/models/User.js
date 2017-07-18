const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function () { // Limit the return values
  var newUser = this;
  var newUserObject = newUser.toObject(); // toObject() takes the mongoose variable (newUser) and converting it into regular object where only the properties available exists

  return _.pick(newUserObject, ['_id', 'email']); // After successfully signs, return id and email
};

UserSchema.methods.generateAuthToken = function () { // Haven't used arrow function because it does't bind this keyword
  var newUser = this; //instance method
  var access = 'auth';
  var token = jwt.sign({
    _id: newUser._id.toHexString(),
    access
  }, 'abc123').toString();

  newUser.tokens.push ({
    access,
    token
  });

  return newUser.save().then(() => { // we return the success callback which will be used in server.js in another callback
    return token; // returns token when the newUser signs successfully
  });

}; // UserSchema.methods,generateAuthToken() ENDs

UserSchema.statics.findByToken = function(token) { // statics is an object just like methods, althought everything you add on to it turns into a model method as opposed to instance method

  var User = this; //Model method
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');

  } catch (err) {
    // return new Promise( (resolve, reject) => {
    //   reject(); // it will return to the catch block inside server.js ('/users/me') and findByToken
    // });
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });

};

var User = mongoose.model('User', UserSchema);

module.exports = {User}
