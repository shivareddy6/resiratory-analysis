const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    title: String,
    body: String,
    createdUser: String
});

module.exports =  mongoose.model("notes", notesSchema)