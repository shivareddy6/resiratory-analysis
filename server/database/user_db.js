const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    mobileNumber: String,
    email: String
});

module.exports =  mongoose.model("user", userSchema)