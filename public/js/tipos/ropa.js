$(function () {
    const actionForm = $('#edit-tipoRopa')
  
      $('.editTipoRopa').click(function(){
          const dataTipoRopa = $(this).data("tropa")
  
          var urlTipoRopaForm = '/articulos/tipos/ropa/edit/' + dataTipoRopa
  
          actionForm.prop('action', urlTipoRopaForm)
          
          $.ajax({
              url: '/articulos/tipos/ropa/' + dataTipoRopa,
              success: function(res) {
                    $('#desc_tiposropa').val(res[0].DESC_TIPOSROPA);
              }
          })
  
      })
        
})