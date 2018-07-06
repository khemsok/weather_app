var val = null;
var url = null;
var x = 0;

$("input").keypress(function(e) {
  if (e.which == 13 && $("input").val().length > 0) {
    $(".box").empty();
    val = $("input").val();
    url =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      val +
      "&appid=ad5361663d2d617ea22f201fd97a7f8c&units=imperial";
    UrlExists(url, x);
    $("input").val("");
    x++;
  }
});

function UrlExists(url, x) {
  var http = new XMLHttpRequest();
  http.open("HEAD", url, false);
  http.send();
  if (http.status != 404) {
    $(".container2").css("display", "none");
    $.getJSON(url, function(data) {
      $(".container2").fadeIn();
      naming(data);
    });
  }
  //  do something
  else {
    alert("NOT FOUND");
    // window.location.reload();
  }
}

// <div class="col-sm-3 container2">
//                 <div class="box">

//                 </div>

var obj = {
    name: null,
    temp: null,
    detail: null
}

var close = '<i class="fas fa-times"></i>';



function naming(data) {
  var id = data.weather[0].id;
  var name = data.name;
  var temp = data.main.temp;
  var detail = data.weather[0].description;
  obj.name = '<h1 id = "title">' + name + "</h1>";
  obj.temp = '<h2 class = "desc">Temperature: ' + temp + " F</h2>";
  obj.detail = '<h2 class = "desc">Description: ' + detail + "</h2>";

  // var umbrella = "<h2 class = \"desc\">You need a dam umbrella</h2>";
  // var noUmbrella = "<h2 class = \"desc\">You don't need no dam umbrella</h2>";

  $(".box").append(obj.name);
  $(".box").append(obj.temp);
  $(".box").append(obj.detail);
  $(".box").append(close);
  // if(id < 700){
  //     $(".box").append(umbrella);
  // }
  // else{
  //     $(".box").append(noUmbrella);
  // }
}



$(".box").on("click", ".fa-times", function() {
  $(this).parent().parent().fadeOut();
});
