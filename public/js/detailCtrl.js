var userlat;
var userlng;
var usergeo = false;
$( document ).ready(function(){

});

$( window ).on( "load", function() {
    getGeoContent();

});

function setDistances() {
    if (usergeo){
        var resourcelat = $("#eng-lat").text();
        var resourcelng = $("#eng-lng").text();
        if (resourcelat) {
            var resourcedistance = Math.round( getDistanceFromLatLonInMiles(userlat, userlng, resourcelat, resourcelng) * 10) / 10;
            $("#eng-distance").text("Distance: " +  resourcedistance + " miles")
        };
    };
};

