const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => { // 27017 is port no & TodoApp refers to the database name

  if(err) {
    return console.log('Unable to Connect to MongoDB server');
  }

  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({ //insertOne will create a new record
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if(err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2)); //result.ops will return the single record
  //
  // });

  db.collection('Users').insertOne({ //insertOne will create a new record
    name: 'Shahmir Khan Jadoon',
    age: 25,
    location: 'Abbottabad'
  }, (err, result) => {
    if(err) {
      return console.log('Unable to insert todo', err);
    }

    console.log(JSON.stringify(result.ops, undefined, 2)); //result.ops will return the single record

  });

  db.close(); // This will close the connection with MongoDB server

}); //MongoClient.connect ENDs
