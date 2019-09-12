const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
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
    },
    wallet: {
        accounts: Array, // [ accountSchema, cashSchema, debitCardSchema ],
        globalBalance: { // getter
            type: Number,
            default: 0,
            required: true
        }
    },
    history: Array, //[ transactionSchema ],
    isAdmin: {
        type: Boolean,
        default: false
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
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(50).email().required(),
        password: Joi.string().min(5).max(50).required()
    })
};

module.exports.User = User;
module.exports.validateUser = validate;