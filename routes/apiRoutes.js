// dependencies
var db = require("../models");

// scraping tools
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function (app) {

    // a GET route for scraping the website
    app.get("/scrape", (req, res) => {
        // using axios to get the html body
        axios.get("http://www.echojs.com/").then(response => {
            // we load the body of the html into the $
            let $ = cheerio.load(response.data);

            // grab every h2 within an article tag
            $(`article h2`).each(function (i, element) {
                let result = {};

                result.title = $(this).children(`a`).text();
                result.summary = $(this).children(`a`).text();
                result.link = $(this).children(`a`).attr(`href`);

                // create a new article using the result object
                db.Article.create(result)
                    .then(dbArticle => console.log(dbArticle))
                    .catch(err => console.log(err));
            });

            res.send(`Scrape Complete`);

        });
    })
}