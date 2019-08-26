$(function () {

    // this saves the user's preference of what page they want to get anime from
    $("#render").on("click", function () {
        console.log(`this was clicked!`);
        $.get("/scrape", function () {
            console.log(`this was scraped!`)
            location.reload();
        })
    })

    // this is the on click button for saving the note
    $(document).on("click", "#save", function () {
        console.log(`this was clicked!`);
        let id = $(this).attr(`data-id`);
        let comment = {
            title: $(`.title`).val(),
            body: $(`.body`).val(),
        }
        console.log(comment)

        $.ajax({
            method: "POST",
            url: "/anime/" + id,
            data: comment
          })
            // With that done
            .then(function(data) {
              // Log the response
              console.log(data);
            });
    })
});