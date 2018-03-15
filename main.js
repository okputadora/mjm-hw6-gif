$(document).ready(function(){
  $("#search").on("click", function() {
    var text = $("#search-term").val()
    if (text == ""){
      alert("enter some text before searching")
      return
    }
    var newButton = $("<button>")
    newButton.text(text)
    newButton.addClass("btn btn-danger padding gif-control")
    newButton.css("margin", "5px")
    $(".button-container").append(newButton)
  })
  $(".button-container").on("click", ".gif-control", function(){
    $(".gif-container").empty()
    var param = $(this).text()
    if (param == ""){
      alert("try writing something in the search field first")
    }
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + param
      + "&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response) {
      var gifs = response.data
      var images = gifs.map(function(gif){
          var img = $("<img>")
          img.attr("src", gif.images.fixed_height_small_still.url)
          img.attr("data-still", gif.images.fixed_height_small_still.url)
          img.attr("data-animate", gif.images.fixed_height_small.url)
          img.attr("data-state", "still")
          img.css("padding", "5px")
          img.addClass("gif-img")
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
  $(".gif-container").on("click", ".gif-img", function(){
    if ($(this).attr("data-state") == "still"){
      console.log("still")
      $(this).attr("data-state", "animated")
      $(this).attr("src", $(this).attr("data-animate"))
    }
    else{
      $(this).attr("data-state", "still")
      $(this).attr("src", $(this).attr("data-still"))
    }
  })
})
