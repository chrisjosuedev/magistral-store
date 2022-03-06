$(function() {

    const actionForm = $('#edit-catLaboral')

    $('.editUsuario').click(function(){
        const dataCatLaboral = $(this).data("catlaboral")

        var urlCatLaboralForm = '/config/categoria-laboral/edit/' + dataCatLaboral

        actionForm.prop('action', urlCatLaboralForm)
        
        $.ajax({
            url: '/config/categoria-laboral/' + dataCatLaboral,
            success: function(res) {
                $('#descripcion_categoria').val(res[0].DESCRIPCION_CATEGORIA);
                $('#salario').val(res[0].SALARIO);
            }
        })

    })
    
})