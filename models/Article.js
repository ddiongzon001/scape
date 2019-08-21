// Dependencies
const mongoose = require("mongoose");

// Save a reference to the Schema
const Schema = mongoose.Schema;

//make a new object for the Article that has title, link, comment & summary
var ArticleSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    link:{
        type: String,
        required: true
    },
    summary:{
        type: String,
        required: true
    },
    // this links to the Note id (this is basically the eqvilent of join in mysql)
    note: {
        type: Schema.Types.ObjectId,
        ref: "Comment" 
    }
})

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
