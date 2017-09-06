const mongoose = require('mongoose');

const types = mongoose.SchemaTypes;

const email = mongoose.Schema({
    email: types.String
});

exports.Email = mongoose.model('email', email);