const mongoose = require('mongoose');

const types = mongoose.SchemaTypes;

const email = mongoose.Schema({
    email: types.String
});

exports.email = mongoose.model('email', email);