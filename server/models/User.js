const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

UserSchema.methods.toJSON = function () { // Limit the return values. methods used for instance methods (like with new User())
  var newUser = this;
  var newUserObject = newUser.toObject(); // toObject() takes the mongoose variable (newUser) and converting it into regular object where only the properties available exists

  return _.pick(newUserObject, ['_id', 'email']); // After successfully signs, return id and email
};

UserSchema.methods.generateAuthToken = function () { // Haven't used arrow function because it does't bind this keyword. methods used for instance methods (like with new User())
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

UserSchema.methods.removeToken = function(token) { //instance method
  var user = this;

  return user.update({
    $pull: {
      tokens: {
        token //it will match the coming token with the stored token and pull(remove) it from the array
      }
    }
  });
};

UserSchema.statics.findByToken = function(token) { // statics is an object just like methods, althought everything you add on to it turns into a model method as opposed to instance method. For statics methods, you can call it directly without instantiating the object (like no need of new User())

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

UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;

  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject('no user found');
    }

    return new Promise((resolve, reject) => { // used Promises beacuse all bcrypt methods are callbacks
      // Use bcrypt.compare to compare password and user.password
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject('Password Dont match');
        }
      });
    });
  });
};

UserSchema.pre('save', function(next) { // pre() executes before save event occurs. In other words, we need to hash the password before saving it into DB
  var user = this; //instance method

  if(user.isModified('password')) { //user.isModified() returns true/false. We only encrpt the password if it is modified
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        //we have to store the hash value in database
        user.password = hash;
        next();
      });
    });


  } else {
    next();
  }


});

var User = mongoose.model('User', UserSchema);

module.exports = {User}
