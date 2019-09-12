const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true
    }
});

userSchema.methods.createToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email
    }, config.get('jwtPrivateKey'));
};

const User = mongoose.model('User', userSchema);

function validate(userData) {
    return Joi.validate(userData, {
        email: Joi.string().min(5).max(50).email().required(),
        password: Joi.string().min(5).max(50).required()
    })
};

module.exports.User = User;
module.exports.validateUser = validate;