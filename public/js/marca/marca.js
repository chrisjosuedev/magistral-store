$(function () {
  const actionForm = $('#edit-marca')

    $('.editMarca').click(function(){
        const dataMarca = $(this).data("marca")

        var urlMarcaForm = '/articulos/marcas/edit/' + dataMarca

        actionForm.prop('action', urlMarcaForm)
        
        $.ajax({
            url: '/articulos/marcas/' + dataMarca,
            success: function(res) {
                $('#nombre_marca').val(res[0].NOMBRE_MARCA);
            }
        })

    })
      
})
  