$(function() {

    const actionForm = $('#edit-accesorioart')

    $('.editAccesorioArt').click(function(){
        const dataAccesorioArt = $(this).data("accesorioart")

        var urlAccesorioArtForm = '/articulos/accesorios/edit/' + dataAccesorioArt

        actionForm.prop('action', urlAccesorioArtForm)
        
        $.ajax({
            url: '/articulos/accesorios/' + dataAccesorioArt,
            success: function(res) {
                $('#descripcion').val(res[0].DESCRIPCION);
                $('#marca').val(res[0].ID_MARCA);
                $('#linea').val(res[0].ID_LINEA_ARTICULO);
                $('#color').val(res[0].ID_COLOR);
                $('#talla').val(res[0].TALLA);
                $('#precio').val(res[0].PRECIO_UNIT);
                $('#tipoaccesorio').val(res[0].ID_TIPOACCESORIO);
            }
        })

    })
    
})