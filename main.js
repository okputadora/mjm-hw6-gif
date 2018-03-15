$(document).ready(function(){
  $("#search").on("click", function() {
    var newButton = $("<button>")
    var text = $("#search-term").val()
    console.log(text)
    newButton.text(text)
    newButton.addClass("btn btn-danger padding gif-control")
    newButton.css("margin", "5px")
    // newButton.addClass("show-gifs")
    // newBUtton.id = text
    $(".button-container").append(newButton)
  })

  $(".button-container").on("click", ".gif-control", function(){
    // clear gifs
    $(".gif-container").empty()
    var param = $(this).text()
    console.log(param)
    if (param == ""){
      alert("try writing something in the search field first")
    }
    // set the query to
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + param
      + "&limit=10";
    console.log(queryURL)
    // and make an ajax call
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response) {
      var gifs = response.data
      console.log(gifs)
      var images = gifs.map(function(gif){
          var img = $("<img>")
          img.attr("src", gif.images.fixed_height_small_still.url)
          img.attr("data-still", gif.images.fixed_height_small_still.url)
          img.attr("data-animate", gif.images.fixed_height_small.url)
          img.css("padding", "5px")
          var gifElement = $("<div>")
          gifElement.append(img)
          gifElement.append("<p>rating: "+gif.rating+"</p>")
          return gifElement
      })
      images.forEach(function(gif){
        $(".gif-container").append(gif)
      })
    })
  })
})
