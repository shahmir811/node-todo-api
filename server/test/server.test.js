const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/Todo');

const seedingTodos = [
  { _id: new ObjectID(), text: 'First test todo', completed: false, completedAt: null },
  { _id: new ObjectID(), text: 'Second test todo', completed: true, completedAt: 12345 }
];

beforeEach((done) => { //beforeEach is a testing lifecycle. Removes all the Todos before starting the test
  Todo.remove({}).then(() => {
    return Todo.insertMany(seedingTodos) // insertMany takes an array and inserts them into the collection. we place return so that we can chain callbacks

  }).then(() => done()); // no {} means no return
});


describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Testing POST todos';

    request(app)
      .post('/todos')
      .send({text}) //supertest will convert it into JSON
      .expect(200)
      .expect( (res) => {
        expect(res.body.text).toBe(text);
      })
      .end( (err, res) => { // Check what get store in mongoDB collection

        if(err) {
          return done(err); //STOPs the function execution
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((err) => {
          return done(err);
        })

      })


  });// it ENDs


  //Following Test to verify that todo has not created when sending invalid data
  it('should not create Todos with invalid data', (done) => {

    request(app)
      .post('/todos')
      .send({text: ''}) //supertest will convert it into JSON
      .expect(400)
      .end( (err, res) => {

        if(err) {
          return done(err); //STOPs the function execution
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2); // toBe(0) means no data has been saved to DB
          done();
        }).catch((err) => {
          return done(err);
        })

      })

  });


}); //describe ENDs

// Test Case for GET /todos
describe('GET /todos', () => {
  it('should get all todos', (done) => {

    request(app)
      .get('/todos')
      .expect(200)
      .expect( (res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);

  });
});

// Test Case for GET /todos/:id
describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {

    request(app)
      .get(`/todos/${seedingTodos[0]._id.toHexString()}`)// need to convert ObjectID to string via toHexString()
      .expect(200)
      .expect( (res) => {
        expect(res.body.todo.text).toBe(seedingTodos[0].text);
      })
      .end(done);

  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);

  });

  it('should return 404 for non-object ids', (done) => {
    var id = '59660f315ceefe28d812b00f1';

    request(app)
      .get(`/todos/${id}.toHexString()`)
      .expect(404)
      .end(done);

  });

});

// Test Case for DELETE /todos/:id
describe('DELETE /todos/:id', () => {

  it('should remove a todo', (done) => {
    var hexId = seedingTodos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => {
          return done(err);
        });

      });
  });


  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for invalid ObjectID', (done) => {
    var id = '59660f315ceefe28d812b00f1';

    request(app)
      .delete(`/todos/${id}.toHexString()`)
      .expect(404)
      .end(done);
  });

});

//Test cases for update/patch
describe('PATCH /todos/:id', () => {

  it('should update the todo', (done) => {
    var hexId = seedingTodos[0]._id.toHexString();
    var text = 'This should be the new text';

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: true,
        text
      }) //supertest will convert it into JSON
      .expect(200)
      .expect( (res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);

  });//it ENDs


  it('should clear the completedAt when todo is set to false', (done) => {
    var hexId = seedingTodos[1]._id.toHexString();
    var text = 'This should be the new text again';

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: false,
        text
      }) //supertest will convert it into JSON
      .expect(200)
      .expect( (res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done);

  });//it ENDs


});
