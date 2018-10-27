//nav slide
$(function(){
    $(document).ready(function () {
        $(".menu-text").click(function () {
            $(".top-layer-nav-list").slideToggle(200);
        });
        // This animated the toggle.
        if ($('.target').is(':visible')) { }
    });
    $('#top-nav li ul').hide().removeClass('fallback');
    $('#top-nav li').click(function () {
            $('#top-nav li ul').not($(this).children("ul").slideToggle(200)).hide();
    });
});

/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("engFilters").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("engFilters").style.width = "0";
}