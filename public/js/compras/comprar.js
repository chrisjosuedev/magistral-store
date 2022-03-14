$(function() {

    const noFound = $('#alert')
    const tableCompra = $('tbody')
    const btnAgregar = $('#btn-agregar')

    // Evitar Submit Post
    $('.compra_input').keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13){
            e.preventDefault()
        }   
    })
    
    // Buscar ENTER KEY Proveedor
    $("#id_proveedor").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13){
            var id = $(this).val()
            startProveedor(id)        
        }   
    })

    // Buscar Click Proveedor
    $('#btn_buscar_proveedor').click(function() {
        var id = $("#id_proveedor").val()
        startProveedor(id)
    })

    // Buscar ENTER KEY Articulo
    $("#id_producto").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            var cod = $(this).val()
            startArticulo(cod)            
        }   
    })

    // Buscar Click Articulo
    $('#btn_buscar_producto').click(function() {
        var cod = $("#id_producto").val()
        startArticulo(cod)
    })

    // ENTER FOCUS 
    $("#cantidad_compra").keypress(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            $('#precio_compra').focus()            
        }   
    })

    // Agregar a Tabla

    btnAgregar.click(function() {

        let cantidad = $('#cantidad_compra').val()
        let precioUnit = $('#precio_compra').val()

        let stItem = parseInt(cantidad) * parseFloat(precioUnit)

        tableCompra.append(`
            <tr>
                <td> ${$("#id_producto").val()} </td>
                <td> ${$("#descripcion").val()} </td>
                <td> ${cantidad} </td>
                <td> ${precioUnit} </td>
                <td> L. ${stItem.toFixed(2)} </td>
                <td>
                    <button class="btn btn-danger btnDeleteItem">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
        `)

        cleanFields()

        $('.btnDeleteItem').click(function() {
            $(this).closest("tr").remove()
        })
    })

    
    // ------------- FUNCIONES

   

    function cleanFields() {
        $("#id_producto").val('')
        $("#descripcion").val('')
        $('#cantidad_compra').val('')
        $('#precio_compra').val('')
        $("#id_producto").focus()
    }

    function startArticulo(idArticulo) {
        if (idArticulo === '') {
            alertFound("Ingrese código del Artículo")
        }
        else {
            foundArticulo(idArticulo)
        }
    }

    function startProveedor(idProveedor) {
        if (idProveedor === '') {
            alertFound("Ingrese código del Proveedor")
        }
        else {
            foundProveedor(idProveedor)
        }
    }

    function foundProveedor(id) {
        $.ajax({
            url: '/proveedores/' + id,
            success: function(res) {
                if (JSON.stringify(res).includes(id)) {
                    $('#nombre_proveedor').val(res[0].NOMBRE_PROVEEDOR)
                    $('#cel_pro').val(res[0].CEL_PROVEEDOR)
                    $('#id_producto').focus()
                }
                else {
                    alertFound("Proveedor no existe, revise el código ingresado")
                }
                
            }
        })
    }

    function foundArticulo (codigo) {
        $.ajax({
            url: '/articulos/general/' + codigo,
            success: function(res) {
                if (JSON.stringify(res).includes(codigo)) {
                    $('#descripcion').val(res[0].DESCRIPCION)
                    $('#cantidad_compra').focus()
                }
                else {
                    alertFound("Artículo no existe, revise el código ingresado")
                }
                
            }
        })
    }


    function noNextFocus(input) {
        //$(input).focusout(function(e){
            //if($(this).val() != ""){
            //    return true;
            //}
            //else{
                var self = $(input);
                setTimeout(function(){
                  self.focus();
                }, 1);            
                return false;
            //}
        //})
    }

    function alertFound(msg) {
        noFound.text(msg)
        noFound.removeClass('d-none')

        setTimeout(function () {
            noFound.addClass('d-none')
        }, 5000)
    }

})