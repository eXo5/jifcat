var topics = ["trending", "Avocado", "Banana", "Cookie", "catsup"];
var topic = $("#gif-input").val();
$(".button").click();

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayTopic() {

 var topic = $(this).attr("data-name");
 var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&limit=10&api_key=dc6zaTOxFJmzC";



  //ajax call for button on click
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) { 
    $("#topics-view").empty();
    console.log(response);
    
    for (var i = 0; i < 10; i++) {
    var activeImage = response.data[i].images.downsized_medium.url;
    var activeImage = response.data[i].images.downsized_medium.url;
    var stillImage = response.data[i].images.downsized_still.url;
    var rating = response.data[i].rating.toUpperCase();

      $("#topics-view").append("<div class='container-fluid'><img class='gif' src='" + stillImage + "' data-animate ='" + activeImage + "' data-still='" + stillImage + "'><p>Rated: " + rating + "</p></div>");

      $(".gif").on("click", function() {
        var state = $(this).attr("data-state");
        console.log(state);

        if (state == "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }

        else if (state != "still"){
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });    
    }
  });
  }

// Function for displaying movie data
function renderButtons() {
 $("#buttons-view").html(" ");
  // Loops the array of topics and creates buttons for those topics
  for (var i = 0; i < topics.length; i++) {
     var button = $("<button>");
    button.addClass("button");
    button.attr("data-name", topics[i]);
    button.text(topics[i]);
    $("#buttons-view").append(button);
      }
}

// add gif button is clicked
$("#add-gif").on("click", function(event) {
  event.preventDefault();
  var gifInput = $("#gif-input").val();
  topics.push(gifInput);

  $("#gif-input").val("");
  renderButtons();
});

$(document).on("click", ".button", displayTopic);

renderButtons();