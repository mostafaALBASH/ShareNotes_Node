const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    gender: {
        type: String
    },
});

module.exports = userSchema;
