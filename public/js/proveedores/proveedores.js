$(function() {

    const actionForm = $('#edit-proveedor')

    const deleteProveedor = $('.delete-proveedor')
    
    // ----- Eliminar Proveedor
    function confirmarDelete(id) {
        Swal.fire({
            title: '¿Confirma eliminar el Proveedor?',
            icon: 'warning',
            confirmButtonColor: '#3F84FC',
            cancelButtonColor: '#FC413F',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {   
                window.location = '/proveedores/delete/' + id                             
            }
        })
    }

    // -- Boton Eliminar Proveedor
    deleteProveedor.on('click', function() {
        var id = $(this).attr("id")
        confirmarDelete(id)
    })


    $('.editProveedor').click(function(){
        const dataProveedor = $(this).data("proveedor")

        var urlProveedorForm = '/proveedores/edit/' + dataProveedor

        actionForm.prop('action', urlProveedorForm)
        
        $.ajax({
            url: '/proveedores/' + dataProveedor,
            success: function(res) {
                $('#id_proveedor').val(res[0].ID_PROVEEDOR);
                $('#nombre_proveedor').val(res[0].NOMBRE_PROVEEDOR);
                $('#email_proveedor').val(res[0].EMAIL_PROVEEDOR);
                $('#cel_proveedor').val(res[0].CEL_PROVEEDOR);
            }
        })

    })
    
})