const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => { // 27017 is port no & TodoApp refers to the database name

  if(err) {
    return console.log('Unable to Connect to MongoDB server');
  }

  console.log('Connected to MongoDB server');

  //findOneAndUpdate(filter, update, options, callback)// we replace callbacks with Promises
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5964a6e7e92fe2f9a434137b')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, { //options
  //   returnOriginal: false //by default, returnOriginal is set to true which returns the old data not the updated.
  // }).then( (result) => {
  //   console.log(result);
  // })

  //update name and age
  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5964883f4bfb0f11c0d45a77')
  }, {
    $set: {
      name: 'Hassan Qamar',
      location: 'Gujrat'
    },
    $inc: {
      age: 4
    }
  }, { //options
    returnOriginal: false //by default, returnOriginal is set to true which returns the old data not the updated.
  }).then( (result) => {
    console.log(result);
  })


  //db.close(); // This will close the connection with MongoDB server

}); //MongoClient.connect ENDs
