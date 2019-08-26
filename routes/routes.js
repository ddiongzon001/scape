// dependencies
var db = require("../models");

// scraping tools
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function (app) {

    // a GET route for scraping the website
    app.get("/scrape", (req, res) => {
        // db.Anime.drop();
        // using axios to get the html body
        axios.get("https://www.livechart.me/summer-2019/tv").then(response => {
            // we load the body of the html into the $
            let $ = cheerio.load(response.data);

            // grab every h2 within an article tag
            $(`article`).each(function (i, element) {
                let result = {};

                result.title = $(this).find(`h3`).children(`a`).text();
                result.summary = $(this).find(`.anime-synopsis`).children(`p`).text();
                result.link = $(this).find(`h3`).children(`a`).attr(`href`);
                result.image = $(this).find(`.poster-container`).children(`img`).attr(`src`);

                // create a new article using the result object
                db.Anime.create(result)
                    // .then(dbArticle => console.log(dbArticle))
                    .catch(err => console.log(err));
            });

        });
    })

    app.delete("/scrape", (req, res) => {
        db.Anime.remove({}).catch(err => console.log(err));
    })

    app.get("/", function (req, res) {
        db.Anime.find({}).limit(4)
            .then(function (dbArticle) {
                console.log(dbArticle);
                var hbsObject = {
                    article: dbArticle
                }
                res.render("index", hbsObject)
            }).catch(function (err) {
                res.json(err);
            })
    })

    // route for grabbing a comment associated with the anime
    app.get("/anime/:id", function(req,res){
        db.Anime.findOne({_id: req.params.id}).populate(`comment`).then(function(dbAnime){
            res.json(dbAnime);
        }).catch(function(err){
            res.json(err);
        });
    });

    // route for saving a comment for the anime
    app.post("/anime/:id", function (req, res) {
        console.log(req.body);
        console.log(req.params.id);
        db.Comment.create(req.body)
        .then(function (dbComment) {
            return db.Anime.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
        }).then(function (dbAnime) {
            res.json(dbAnime);
        }).catch(function (err) {
            res.json(err);
        });
    });

}
