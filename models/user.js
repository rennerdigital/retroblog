const mongoose = require('mongoose');


const userSchema = new mongoose.Schema;

var studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    cohort: String,
    avatar: String,
    googleId: String
  }, {
    timestamps: true
  });