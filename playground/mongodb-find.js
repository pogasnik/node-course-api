//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
    if (err) {
     return console.log('Unable to connect to db server');
    }

    console.log('Connected to MongoDB server')

    // db.collection('Todos').find({
    //     _id: new ObjectID("5ae4d72cec48ff0f7c843168")
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log('Todos count: ', count);
        
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

db.collection('Users').find({name: 'Salus'}).toArray().then((docs) => {
   //uber error handling
    if (docs[0] === undefined){
        return console.log('Not valid search');
    }
    
    console.log('Fetched User: ');
    
    //can use this instead actually!
    //console.log({docs});
    console.log(JSON.stringify(docs, undefined, 2));
}, (err) => {
    console.log('Unable to fetch user', err);
});



    //db.close();
});