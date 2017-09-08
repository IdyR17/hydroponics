const mongoose = require('mongoose');

const types = mongoose.SchemaTypes;

const email = mongoose.Schema({
    email: {
        type : types.String,
        unique : true
    }
});

exports.Email = mongoose.model('email', email);