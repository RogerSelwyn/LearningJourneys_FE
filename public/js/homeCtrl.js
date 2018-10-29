//nav slide
$(function(){
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

