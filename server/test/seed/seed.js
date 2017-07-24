const {Todo} = require('./../../models/Todo');
const {User} = require('./../../models/User');
const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const seedingUsers = [{
  _id: userOneId,
  email: 'shahmirkj_811@example.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
  }]
}, {
  _id: userTwoId,
  email: 'talhaHisham@example.com',
  password: 'userTwoPass'
}];


const seedingTodos = [
  { _id: new ObjectID(), text: 'First test todo', completed: false, completedAt: null },
  { _id: new ObjectID(), text: 'Second test todo', completed: true, completedAt: 12345 }
];

const populateTodos = (done) => { //beforeEach is a testing lifecycle. Removes all the Todos before starting the test
  Todo.remove({}).then(() => {
    return Todo.insertMany(seedingTodos) // insertMany takes an array and inserts them into the collection. we place return so that we can chain callbacks

  }).then(() => done()); // no {} means no return
};

const populateUsers = (done) => { //beforeEach is a testing lifecycle. Removes all the Todos before starting the test
  User.remove({}).then(() => {
    var userOne = new User(seedingUsers[0]).save();
    var userTwo = new User(seedingUsers[1]).save();

    return Promise.all([userOne, userTwo]); // Promise.all takes an array of promises, return success after all the individual items in an array are successfull

  }).then(() =>  done());
};

module.exports = {seedingTodos, populateTodos, seedingUsers, populateUsers};
