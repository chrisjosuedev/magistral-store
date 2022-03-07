$(function() {

    const actionForm = $('#edit-calzadoart')

    $('.editCalzadoArt').click(function(){
        const dataCalzadoArt = $(this).data("calzadoart")

        var urlCalzadoArtForm = '/articulos/calzado/edit/' + dataCalzadoArt

        actionForm.prop('action', urlCalzadoArtForm)
        
        $.ajax({
            url: '/articulos/calzado/' + dataCalzadoArt,
            success: function(res) {
                $('#descripcion').val(res[0].DESCRIPCION);
                $('#marca').val(res[0].ID_MARCA);
                $('#linea').val(res[0].ID_LINEA_ARTICULO);
                $('#color').val(res[0].ID_COLOR);
                $('#talla').val(res[0].TALLA);
                $('#precio').val(res[0].PRECIO_UNIT);
                $('#tiposcalzado').val(res[0].ID_TIPOCALZADO);
            }
        })

    })
    
})