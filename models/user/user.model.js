const mongoose = require('mongoose');
const userSchema =  require('./user.schema');
const userModel = mongoose.model('User', userSchema);
module.exports = userModel;

userModel.createUser = createUser;
userModel.readUsers = readUsers;
userModel.isUserExist = isUserExist;
userModel.readUsersByUserId = readUsersByUserId;

function isUserExist(user, callback) {
    userModel.find({username: user.username}, callback)
}

function readUsers(callback, limit) {
    userModel.find(callback).limit(limit);
}

function createUser(user, callback) {
    userModel.create(user, callback)
}

function readUsersByUserId(payload, callback) {
    userModel.find({_id: payload}).exec(callback);
}
