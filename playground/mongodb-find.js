const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => { // 27017 is port no & TodoApp refers to the database name

  if(err) {
    return console.log('Unable to Connect to MongoDB server');
  }

  console.log('Connected to MongoDB server');

  // db.collection('Todos').find().toArray().then((docs) => { // query for fetching all records
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  //
  // }).catch( (err) => {
  //   console.log('Unable to Fetch Todos');
  // });

  // Fetch the records whose completed state is true
  db.collection('Todos').find({
      _id: ObjectID('596484ebe92fe2f9a4340b8a')
   }).toArray().then((docs) => {
    console.log('Todos');
    console.log(JSON.stringify(docs, undefined, 2));

  }).catch( (err) => {
    console.log('Unable to Fetch Todos');
  });

  //Counting Records
  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos Count: ${count}`);
  //
  //
  // }).catch( (err) => {
  //   console.log('Unable to Fetch Todos');
  // });

  //Find record with name="Andrew"
  // db.collection('Users').find({ name: 'Andrew' }).toArray().then((name) => {
  //   console.log(JSON.stringify(name, undefined, 2));
  // }).catch((err) => {{
  //   console.log(`Unable to fetch record: ${err}`);
  // }});

  //db.close(); // This will close the connection with MongoDB server

}); //MongoClient.connect ENDs
