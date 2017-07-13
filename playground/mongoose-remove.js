const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/Todo');
const { User } = require('./../server/models/User');

var id = '5966facd9379670320eb10d1';

// Todo.remove() . Removes multiple records that matches the criteria. If you want to remove all the records then you need to write Todo.remove({}) (not like Todo.remove()). Check result{ok: 1, n: 3}. Not return doc

Todo.findOneAndRemove({completed: false}).then((todo) => { // Removes the firstOne that matches the criteria. Also gives back the removed todo which will helpful to show
  console.log('Todo is removed: ', todo);

}).catch((err) => {
  console.log('Not Found any Todo', err);
});

// Todo.findByIdAndRemove(id).then((todo) => {
//   console.log('Todo is removed: ', todo);
// }).catch((err) => {
//   console.log('Not Found any Todo');
// });
