$(function() {

// this saves the user's preference of what page they want to get anime from
$("#render").on("click", function(){
    console.log(`this was clicked!`);
    $.get("/", function(){

    })
})

$(`.poop`).text("hello");

console.log(`hello`);
});