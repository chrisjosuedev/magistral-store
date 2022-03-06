$(function () {
    const actionForm = $('#edit-tipoCalzado')
  
      $('.editTipoCalzado').click(function(){
          const dataTipoCalzado = $(this).data("tcalzado")
  
          var urlTipoCalzadoForm = '/articulos/tipos/calzado/edit/' + dataTipoCalzado
  
          actionForm.prop('action', urlTipoCalzadoForm)
          
          $.ajax({
              url: '/articulos/tipos/calzado/' + dataTipoCalzado,
              success: function(res) {
                    $('#desc_tipocalzado').val(res[0].DESC_TIPOCALZADO);
              }
          })
  
      })
        
})