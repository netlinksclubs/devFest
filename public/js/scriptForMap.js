
var x,y,p;

function getLocation()
  {
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(showPosition);
    }
  else{alert("Geolocation is not supported by this browser.");}
  }
function showPosition(position)
  {
  p=position;
  alert(position);
  x	= position.coords.latitude ;
  y = position.coords.longitude;
  alert(x+" // " + y);	
  }


function needHelp(){
	getLocation();
	showPosition();
	
	$.ajax({
  		type: "POST",
  		url: "/request/needhelp",
  		data: { latitude: x, location: y }
	})
  	.done(function( msg ) {
    	alert( "Data Saved: " + msg );
  	});
}