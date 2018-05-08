//Creating user Schema and imporitng it into the model
const mongoose = require('mongoose');
const _ = require('lodash');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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
    var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();

    user.tokens.push({access, token});
    return user.save().then(() => {
        return token;
    });
};

userSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        // return new Promise((resolve, reject) => {
        //     reject();
        // });
        return Promise.reject();
    }

    return User.findOne({
       '_id': decoded._id,
       'tokens.token': token,
       'tokens.access': 'auth' 
    });
};

userSchema.statics.findByCredentials = function (email, password) {
    var User = this;

   return User.findOne({email}).then((user) => {
        if (!user) {
            return Promise.reject();
        }
        
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    }).catch((e) => res.status(400).send());
};

userSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) =>{
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.removeToken = function (token) {
    var user = this;

    return user.update({
        $pull: {
            tokens: {
                token
            }
        }
    });
};
var User = mongoose.model('User', userSchema);

module.exports = {User};