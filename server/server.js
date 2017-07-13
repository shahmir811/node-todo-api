var express = require('express');
var bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/Todo');
var { User } = require('./models/User');

var app = express();

var port = process.env.PORT || 3000;
app.use(bodyParser.json()); //Using Middleware

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
app.listen(port, () => {
  console.log(`Started at PORT: ${port}`);
});

module.exports = {app};
