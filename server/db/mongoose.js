var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let db = {
  localhost: 'mongodb://localhost:27017/TodoApp',
  mlab: 'mongodb://hello:hello123@ds157112.mlab.com:57112/todoapp'
};

//mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp'); // Connect to Database

mongoose.connect(process.env.PORT ? db.mlab : db.localhost); // Connect to Database

module.exports = {
  mongoose
};
