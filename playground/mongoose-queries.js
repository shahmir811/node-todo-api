const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/Todo');
const { User } = require('./../server/models/User');

var id = '69660f315ceefe28d812b00f';

if (!ObjectID.isValid(id)) { // ObjectID.isValid(id) return true or false
  console.log('ID not valid');
}

Todo.find({
  _id: id // no need of _id: new ObjectID(''), mongoose will do it itself
}).then((todos) => {
  console.log('Todos', todos);
}).catch((err) => {
  console.log('Not found any Todo', err);
});


// findOne is just like find, only it grabs and returns the firstone that matches the criteria. Prefer this if you want to find some record based on ID
Todo.findOne({
  _id: id
}).then( (todo) => {
  console.log('Todo', todo);
}).catch((err) => {
  console.log('Not found any Todo', err);
});

// findById only works when you are finding based on ID. Also no need of _id: id
Todo.findById(id).then( (todo) => {
  if(!todo) {
    return console.log('ID not found');
  }

  console.log('Todo', todo);
}).catch((err) => {
  console.log('Not found any Todo', err);
});
