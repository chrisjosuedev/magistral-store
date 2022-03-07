$(function() {

    const actionForm = $('#edit-cliente')

    $('.editCliente').click(function(){
        const dataCliente = $(this).data("cliente")

        var urlPersonaForm = '/persona/clientes/edit/' + dataCliente

        actionForm.prop('action', urlPersonaForm)
        
        $.ajax({
            url: '/persona/clientes/' + dataCliente,
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

                $('#direccion_residencia').val(res[0].DIRECCION_RESIDENCIA);

                $('#select-depto').val(res[0].ID_DEPTO)

                
                var deptoID = $("#select-depto option:selected").val()
                var ciudadID = res[0].ID_CIUDAD
                
                getEditByCiudad(deptoID, ciudadID)

                
            }
        })
    })

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