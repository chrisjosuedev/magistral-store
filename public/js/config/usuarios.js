$(function() {
    const noRows = $('#alert')
    const bEmp = $("#bEmp")
    const idEmp = $("#idEmp")

    const idNameEmp = $("#nameEmp")
    const idCodEmp = $("#codEmp")

    bEmp.on('click', function () {
        var id = idEmp.val()

        $.ajax({
            url: "/persona/empleados/" + id,
            success: function (empleado) {
                if (empleado.length === 0) {
                    noRows.text("Empleado no existe, ingrese el DNI correctamente.")
                    noRows.removeClass('d-none')

                    setTimeout(function () {
                        noRows.addClass('d-none')
                    }, 5000)
                }
                else {
                    if (empleado[0].ID_CATEGORIA === 2) {
                        noRows.text("ADVERTENCIA: Al personal de seguridad no puede asignarsele un usuario, por favor intente con otro empleado.")
                        noRows.removeClass('d-none')

                        setTimeout(function () {
                            noRows.addClass('d-none')
                        }, 7000)
                    }
                    else {
                        idNameEmp.val(empleado[0].NOMBRE_EMPLEADO)
                        idCodEmp.val(empleado[0].ID_EMPLEADO)
                        $('#user').focus()
                    }
                }

            }
        })
        
    });

    // ---------- Editar ----------------


    const actionForm = $('#edit-Usuario')

    $('.editUsuario').click(function(){
        const dataUsuarios = $(this).data("usuario")

        var urlUsuariosForm = '/config/usuarios/edit/' + dataUsuarios

        actionForm.prop('action', urlUsuariosForm)
        
        $.ajax({
            url: '/config/usuarios/' + dataUsuarios,
            success: function(res) {
                $('#username').val(res[0].USERNAME)
                $('#select-rol').val(res[0].ID_ROL)  
            }
        })        

    })

    // Verificar si se desea una nueva contraseña para el usuario
    $('#verify-Password').click(function() {
        if ($('#verify-Password').prop('checked')) {
            $('#password').removeClass('d-none')
            $('#password').focus()
        }
        else {
            $('#password').addClass('d-none')
        }
    })
    

})