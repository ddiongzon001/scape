// dependencies
var db = require("../models");

// scraping tools
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function (app) {

    // a GET route for scraping the website
    app.get("/scrape/:season/:year", (req, res) => {
        // db.Anime.drop();
        let season = req.params.season;
        let year = req.params.year;
        // using axios to get the html body
        axios.get(`https://www.livechart.me/${season}-${year}/tv`).then(response => {
            // we load the body of the html into the $
            let $ = cheerio.load(response.data);

            // grab every h2 within an article tag
            $(`article`).each(function (i, element) {
                let result = {};

                result.title = $(this).find(`h3`).children(`a`).text();
                result.summary = $(this).find(`.anime-synopsis`).children(`p`).text();
                result.link = $(this).find(`h3`).children(`a`).attr(`href`);

                let image = $(this).find(`.poster-container`).children(`img`).attr(`src`)

                if (image.includes(`transparent`)) {
                    result.image = `https://u.cubeupload.com/diskinected/nopicture.png`
                } else {
                    result.image = image;
                }

                // create a new article using the result object
                db.Anime.create(result)
                    // .then(dbArticle => console.log(dbArticle))
                    .catch(err => console.log(err));
            });

        });
    })

    app.get("/", function (req, res) {
        db.Anime.find({})
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

    app.delete("/", (req, res) => {
        db.Anime.remove({})
            .catch(err => console.log(err));
    })

    // route for grabbing a comment associated with the anime
    app.get("/anime/:id", function (req, res) {
        db.Anime.findOne({ _id: req.params.id }).populate(`comment`).then(function (dbAnime) {
            res.json(dbAnime);
        }).catch(function (err) {
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

    // route for saving a comment for the anime
    app.delete("/anime/:id", function (req, res) {
        db.Comment.remove({ _id: req.params.id })
        .then(function () {
            return db.Anime.findOneAndUpdate({ comment: req.params.id }, { $unset: {comment: ""}}, { new: true });
        }).catch(err => console.log(err));
    });


    app.get("/saved", function (req, res) {
        db.Saved.find({})
            .then(function (dbArticle) {
                console.log(dbArticle);
                var hbsObject = {
                    saved: dbArticle
                }
                res.render("saved", hbsObject)
            }).catch(function (err) {
                res.json(err);
            })
    })

}
