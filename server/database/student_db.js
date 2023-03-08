const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  id: String,
  name: String,
  class: String,
});

module.exports = mongoose.model("students", studentSchema);
