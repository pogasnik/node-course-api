//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
    if (err) {
     return console.log('Unable to connect to db server');
    }

    console.log('Connected to MongoDB server')

    // //deleteMany
    // db.collection('Todos').deleteMany({text: "Eat lunch"}).then((result) => {
    //     console.log(result);
    // })

    //deleteOne
    // db.collection('Todos').deleteOne({text: "Eat lunch"}).then((result) => {
    //     console.log(result);
    // });

    //FindOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // })

    //Challenge

    //Deleting Doublicates
    // db.collection('Users').deleteMany({name: "Nick"}).then((result) => {
    //     console.log(result);
    // })

    //deleting one by id
    // var lol = ObjectID
    db.collection('Users').findOneAndDelete({_id: ObjectID("5ae4db0e30045819148f88f0")}).then((result) => {
        console.log(result);
    })


    //db.close();
});