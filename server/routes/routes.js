const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('../db/mongoose');
var { Todo } = require('../models/Todo');
var { User } = require('../models/User');

var app = express();

// ***************************************************** //

// Post Request for creating a POST
app.post('/todos', (req, res) => {
  var newTodo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    completedAt: req.body.completedAt
  });

  newTodo.save().then( (docs) => {
    res.send(docs);

  }).catch((err) => {
    res.status(400).send(err);

  });

});

// ***************************************************** //
// GET request to get all todos
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    //res.send(todos); // not using (also not recommended) because it returns an Array
    res.send({todos});

  }).catch((err) => {
    res.status(400).send(err);

  });

});

// ***************************************************** //
// GET request to get a single todo
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) { // ObjectID.isValid(id) return true or false
    return res.status(404).send();
  }

  Todo.findById(id).then( (todo) => {
    if(!todo) {
      return res.status(404).send();
    }

    res.send({todo}); // if todo is found

  }).catch((err) => {
    return res.status(400).send();

  });

});
// ***************************************************** //
// Delete request to delete a single todo

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) { // ObjectID.isValid(id) return true or false
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }

    res.send({todo}); // if todo is found

  }).catch((err) => {
    return res.status(400).send();
  });


});

// ***************************************************** //
// Updating a todo
// it uses patch method. PATCH method is used to update a record (recommended)
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']); // pick takes an oject and grabs only those properties that you want to change (like here we grab text and completed)

  if (!ObjectID.isValid(id)) { // ObjectID.isValid(id) return true or false
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed) { //if completed is updated to true then updated the completedAt to UNIX timestamp
    body.completedAt = new Date().getTime();
  } else { //if completed is updated to false then updated the completedAt to null and completed to false
    body.completed   = false;
    body.completedAt = null;
  }

  //findByIdAndUpdate(filter, update, options, callback)
  Todo.findByIdAndUpdate(id, { $set: body }, {new: true}).then( (todo) => { // { $set: body } means update the old body(text and completed). {new: true} will give us the updated value
  if (!todo) {
    return res.status(404).send();
  }

  res.send({todo});

}).catch((err) => {
  return res.status(400).send();
});

});
