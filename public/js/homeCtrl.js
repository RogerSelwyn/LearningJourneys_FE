var userlat;
var userlng;
var usergeo = false;
$( document ).ready(function(){
    $("#eng-resourcetypefilter").change(function() {
        document.location.href = "filter?rtid=" + $(this).val();
    });
    $( "#slider-range" ).slider({
        range: true,
        min: 0,
        max: 24,
        values: [ 11, 16 ],
        slide: function( event, ui ) {
            $( "#agerange" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
        }
    });
    $( "#agerange" ).val( $( "#slider-range" ).slider( "values", 0 ) +  " - " + $( "#slider-range" ).slider( "values", 1 ) );


    if ("geolocation" in navigator) {
        // check if geolocation is supported/enabled on current browser
        navigator.geolocation.getCurrentPosition(
            function success(position) {
                // for when getting location is a success
                userlat = position.coords.latitude;
                userlng = position.coords.longitude;
                usergeo = true;
                console.log('latitude', position.coords.latitude, 'longitude', position.coords.longitude);
            },
            function error(error_message) {
                // for when getting location results in an error
                console.error('An error has occured while retrieving location', error_message)
            }) 
    } else {
        // geolocation is not supported
        // get your location some other way
    };
});

$( window ).on( "load", function() {
    if ($("#loginbutton a").text() != "Login") {

    };

    if (usergeo){
        $(".eng-resources").each(function(){
            var resourcelat = $( this ).find("#eng-lat").text();
            var resourcelng = $( this ).find("#eng-lng").text();
            if (resourcelat) {
                var resourcedistance = Math.round( getDistanceFromLatLonInMiles(userlat, userlng, resourcelat, resourcelng) * 10) / 10;
                var engdistance = $( this ).find("#eng-distance").text();
                $( this ).find("#eng-distance").text("Distance: " +  resourcedistance + " miles")
            };
        });
    };

});
/* Set the width of the side navigation to 250px */
function openNav() {
    var openwidth = 300;
    var buttonposition = openwidth - 6;
    var currentwidth = $( "#engSidebar" ).css("width");
    if (openwidth + "px" == currentwidth) {
        document.getElementById("engSidebar").style.width = "0";
        document.getElementById("engSidebarBtn").style.left = "0";
    } else {
        document.getElementById("engSidebar").style.width = openwidth + "px";
        document.getElementById("engSidebarBtn").style.left = buttonposition + "px";
    }
}

function getDistanceFromLatLonInMiles(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d * 0.621371;
};

function deg2rad(deg) {
    return deg * (Math.PI / 180);
};

