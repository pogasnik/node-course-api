const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {User} = require('./../server/models/users');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove({}).then(() => {

// });

Todo.findByIdAndRemove('5aef44368920ddfeccd78565').then((todo) => {
    console.log(todo);
});