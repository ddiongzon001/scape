// dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// initialize express
const app = express();

// require all models, & routes & set the port
const db = require("./models");
require("./routes/routes.js")(app);
const PORT = 8000;

// use morgan logger for logging requests
app.use(logger("dev"));
// parse request body as JSON
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// make public a static folder
app.use(express.static("public"));

//Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URL || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Start the server
app.listen(PORT, function(){
    console.log("App running on port http://localhost:" + PORT + " !");
})