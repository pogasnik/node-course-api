//Creating user Schema and imporitng it into the model
const mongoose = require('mongoose');
const _ = require('lodash');
const validator = require('validator');
const jwt = require('jsonwebtoken');
// {
//     email: 'pogasnik@gmail.com',
//     password: 'myPass123',
//     tokens: [{
//         access: 'auth',
//         token: 'asdfsfasdf'
//     }]
// }

var userSchema = new mongoose.Schema({
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject();
    
    return _.pick(userObject, ['_id', 'email']);
}

//POST /users
userSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

    user.tokens.push({access, token});
    return user.save().then(() => {
        return token;
    });
};
var User = mongoose.model('User', userSchema);

module.exports = {User};