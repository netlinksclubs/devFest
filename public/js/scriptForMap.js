
var x,y;

function getLocation()
{
  if (navigator.geolocation)
  {
    navigator.geolocation.getCurrentPosition(function(position) {
      x = position.coords.latitude;
      y = position.coords.longitude;
    }, function(e) {console.log(e);});
  }
  else
  {
    alert("Geolocation is not supported by this browser.");
  }
}

getLocation();

function needHelp(){
	$.ajax({
  		type: "POST",
  		url: baseURL + "/request/needhelp",
  		data: { latitude: x, longitude: y }
	})
  	.done(function( msg ) {
    	alert( "Data Saved: " + msg );
  	});
}