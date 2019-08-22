$(function() {

// this saves the user's preference of what page they want to get anime from
$("#render").on("click", function(){
    console.log(`this was clicked!`);
    $.get("/scrape", function(){
        console.log(`this was scraped!`)
        location.reload();
    })
})

$(`.poop`).text("hello");

console.log(`hello`);
});