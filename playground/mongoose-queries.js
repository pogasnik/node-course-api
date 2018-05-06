const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {User} = require('./../server/models/users');
// var id = '5aeec6dbee8729307829faff11';
// if (!ObjectID.isValid(id)){
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todos', todo);
// });

// Todo.findById(id).then((todo) =>{
//     if (!todo) {
//         return console.log('id not found');
//     }
//     console.log('Todo by ID', todo);
// }).catch((e) => console.log(e));


//user.find by id 
//case for no user, case he was found, error
var id = '5aec8e8e8d78a72454196a47';
User.findById(id).then((user) =>{
    if (!user) {
        return console.log('ID not found');
    }
    console.log('User by ID', user);
}).catch((e) => console.log(e));
