/**
 * Created by alessandra.sasaki on 11/12/2017.
 */

$(document).ready(function() {
    $("#myModal").modal();
});

$('.modal-content').resizable({
    //alsoResize: ".modal-dialog",
    minHeight: 300,
    minWidth: 300
  });
  $('.modal-dialog').draggable();

  $('#myModal').on('show.bs.modal', function() {
    $(this).find('.modal-body').css({
      'max-height': '100%'
    });
  });