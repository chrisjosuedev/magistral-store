$(function() {

    const actionForm = $('#edit-payment')

    $('.editProveedor').click(function(){
        const dataProveedor = $(this).data("proveedor")

        var urlProveedorForm = '/articulos/proveedores/edit/' + dataProveedor

        actionForm.prop('action', urlProveedorForm)
        
        $.ajax({
            url: '/articulos/proveedores/' + dataProveedor,
            success: function(res) {
                $('#id_proveedor').val(res[0].ID_PROVEEDOR);
                $('#nombre_proveedor').val(res[0].NOMBRE_PROVEEDOR);
                $('#email_proveedor').val(res[0].EMAIL_PROVEEDOR);
                $('#cel_proveedor').val(res[0].CEL_PROVEEDOR);
            }
        })

    })
    
})