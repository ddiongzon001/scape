// Dependencies
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// make a constructor with two things, title and body
var CommentSchema = new Schema({
    title: String,
    body: String
})

// this creates the model from the above schema
var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;