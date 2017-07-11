const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => { // 27017 is port no & TodoApp refers to the database name

  if(err) {
    return console.log('Unable to Connect to MongoDB server');
  }

  console.log('Connected to MongoDB server');

  //deleteMany
  // db.collection('Todos').deleteMany({ text: 'Eat Lunch' }).then((result) => { //just check result: { ok: 1, n: 3 } and deletedCount:
  //   console.log(result);
  //
  // }).catch((err) => {
  //   console.log('Unable to delete records, ', err);
  // })

  //deleteOne
  //works exactly the same as deleteMany. Only it deletes the first item that matches the criteria and then stops
  // db.collection('Todos').deleteOne({ text: 'Eat Lunch' }).then((result) => { //just check result: { ok: 1, n: 1 } and deletedCount:
  //   console.log(result);
  //
  // }).catch((err) => {
  //   console.log('Unable to delete records, ', err);
  // })

  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({ completed: false }).then((result) => { //just check lastErrorObject : { ok: 1, n: 1 }
  //   console.log(result);
  //   //console.log(`${result.value.text} has been deleted`);
  //
  // }).catch((err) => {
  //   console.log('Unable to delete records, ', err);
  // })


  //deleteMany records with name: 'Andrew'
  // db.collection('Users').deleteMany({ name: 'Andrew' }).then((result) => { //just check result: { ok: 1, n: 3 } and deletedCount:
  //   console.log(result);
  //
  // }).catch((err) => {
  //   console.log('Unable to delete records, ', err);
  // });

  //findOneAndDelete based on id
  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('596463279c816c0434f7cfa5')
  }).then((result) => { //just check lastErrorObject : { ok: 1, n: 1 }
    console.log(result);
    //console.log(`${result.value.text} has been deleted`);

  }).catch((err) => {
    console.log('Unable to delete records, ', err);
  })

  //db.close(); // This will close the connection with MongoDB server

}); //MongoClient.connect ENDs
