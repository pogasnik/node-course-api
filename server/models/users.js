//Creating user Schema and imporitng it into the model
var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    name: String,
    pass: String,
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

var User = mongoose.model('User', userSchema);

module.exports = {User};