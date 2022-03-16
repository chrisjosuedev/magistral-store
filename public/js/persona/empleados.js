$(function() {

    const actionForm = $('#edit-empleado')

    const deleteEmpleado = $('.delete-empleado')
    
    // ----- Eliminar Empleado
    function confirmarDelete(id) {
        Swal.fire({
            title: '¿Confirma eliminar el Empleado?',
            icon: 'warning',
            confirmButtonColor: '#3F84FC',
            cancelButtonColor: '#FC413F',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {   
                window.location = '/persona/empleados/delete/' + id                             
            }
        })
    }

    // -- Boton Eliminar Empleado
    deleteEmpleado.on('click', function() {
        var id = $(this).attr("id")
        confirmarDelete(id)
    })


    $('.editEmpleado').click(function(){
        const dataEmpleado = $(this).data("empleado")

        var urlEmpleadoForm = '/persona/empleados/edit/' + dataEmpleado

        actionForm.prop('action', urlEmpleadoForm)
        
        $.ajax({
            url: '/persona/empleados/' + dataEmpleado,
            success: function(res) {
                $('#id_persona').val(res[0].ID_PERSONA);
                $('#nombre_persona').val(res[0].NOMBRE_PERSONA);
                $('#apellido_persona').val(res[0].APELLIDO_PERSONA);

                if (res[0].SEXO === 0) {
                    $("#male").prop("checked", true);
                } else {
                    $("#female").prop("checked", true);
                }

                $('#celular').val(res[0].CELULAR)

                $('#direccion_residencia').val(res[0].DIRECCION_RESIDENCIA)

                $('#sel-laboral').val(res[0].PUESTO)

                
                $('#fecha_contratacion').val(formatDateLaboral(res[0].FECHA_CONTRATACION))

                $('#select-depto').val(res[0].ID_DEPTO)

                
                var deptoID = $("#select-depto option:selected").val()
                var ciudadID = res[0].ID_CIUDAD
                
                getEditByCiudad(deptoID, ciudadID)

                
            }
        })
    })

    function formatDateLaboral(fecha) {
        var d = new Date(fecha),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }
            
        if (day.length < 2) {
            day = '0' + day;
        }
            
        return [year, month, day].join('-');
    }

    function getEditByCiudad(id, idCity) {
        $.ajax({
            url: '/persona/ciudad/' + id,
            success: function(res) {
                $('#select-ciudad').empty()
                res.forEach(res => {
                    $('#select-ciudad').append(`
                      <option value='${res.ID_CIUDAD}'> ${res.NOMBRE_CIUDAD} </option>
                    `)
                })
                $('#select-ciudad').val(idCity)
            }
        })
    }
})