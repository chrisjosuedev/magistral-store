$(function () {
    const actionForm = $('#edit-color')
  
      $('.editColor').click(function(){
          const dataColor = $(this).data("color")
  
          var urlColorForm = '/articulos/colores/edit/' + dataColor
  
          actionForm.prop('action', urlColorForm)
          
          $.ajax({
              url: '/articulos/colores/' + dataColor,
              success: function(res) {
                  $('#desc_color').val(res[0].DESC_COLOR);
              }
          })
  
      })
        
  })
    