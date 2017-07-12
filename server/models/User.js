var mongoose = require('mongoose');

var User = mongoose.model('User', { // For ease, variable name is same as of model name (like User)
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true, // It will trim white spaces from beginning and end of string
  }

});

module.exports = {
  User
};
