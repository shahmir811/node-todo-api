const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/Todo');

const seedingTodos = [
  { text: 'First test todo' },
  { text: 'Second test todo' }
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
