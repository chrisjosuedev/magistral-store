$(function () {
    const actionForm = $('#edit-tipoAccesorio')
  
      $('.editTipoAccesorio').click(function(){
          const dataTipoAccesorio = $(this).data("taccesorio")
  
          var urlTipoAccesorioForm = '/articulos/tipos/accesorios/edit/' + dataTipoAccesorio
  
          actionForm.prop('action', urlTipoAccesorioForm)
          
          $.ajax({
              url: '/articulos/tipos/accesorios/' + dataTipoAccesorio,
              success: function(res) {
                    $('#desc_tipoaccesorio').val(res[0].DESC_TIPOACCESORIO);
              }
          })
  
      })
        
})