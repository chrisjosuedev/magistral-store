$(function() {

    const actionForm = $('#edit-payment')

    $('.editModoPago').click(function(){
        const dataPagos = $(this).data("pagos")

        var urlPaymentForm = '/transacciones/metodos-pago/edit/' + dataPagos

        actionForm.prop('action', urlPaymentForm)
        
        $.ajax({
            url: '/transacciones/metodos-pago/' + dataPagos,
            success: function(res) {
                $('#desc_modopago').val(res[0].DESC_MODOPAGO);
            }
        })

    })
    
})