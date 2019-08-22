// Dependencies
const mongoose = require("mongoose");

// Save a reference to the Schema
const Schema = mongoose.Schema;

//make a new object for the Article that has title, link, comment & summary
var AnimeSchema = new Schema({
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
    },
    image:{
        type: String,
        required: true
    },
    // this links to the Note id (this is basically the eqvilent of join in mysql)
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment" 
    }
})

var Anime = mongoose.model("Anime", AnimeSchema);

module.exports = Anime;
