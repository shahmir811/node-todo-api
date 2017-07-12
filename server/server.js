var express = require('express');
var bodyParser = require('body-parser');

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



// ***************************************************** //
app.listen(port, () => {
  console.log(`Started at PORT: ${port}`);
});
