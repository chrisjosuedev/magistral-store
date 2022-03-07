$(function() {

    const actionForm = $('#edit-ropaart')

    $('.editRopaArt').click(function(){
        const dataRopaArt = $(this).data("ropaart")

        var urlRopaArtForm = '/articulos/ropa/edit/' + dataRopaArt

        actionForm.prop('action', urlRopaArtForm)
        
        $.ajax({
            url: '/articulos/ropa/' + dataRopaArt,
            success: function(res) {
                $('#descripcion').val(res[0].DESCRIPCION);
                $('#marca').val(res[0].ID_MARCA);
                $('#linea').val(res[0].ID_LINEA_ARTICULO);
                $('#color').val(res[0].ID_COLOR);
                $('#talla').val(res[0].TALLA);
                $('#precio').val(res[0].PRECIO_UNIT);
                $('#tiposropa').val(res[0].ID_TIPOSROPA);
            }
        })

    })
    
})