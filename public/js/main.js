$(function(){
    $('.eng-subject').on('click', function(e){
        var id = { subjectid: $(this).data('id') };
        $.get( '/filter',id, function(data) {
          $('#results').html(data);
       });
    });
});

$(function(){
    $('.eng-resourcetype').on('click', function(e){
        var id = { rtid: $(this).data('id') };
        $.get( '/filter',id, function(data) {
          $('#results').html(data);
       });
    });
});