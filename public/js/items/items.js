$(function () {

  const tipoArticulo = $("#tipo_articulo")
  const detalleArticulo = $("#detalle_articulo")

  function urlTipoArticulo (urlGet) { 
    if (urlGet != 'none') {
      $.ajax({
        url: urlGet,
        success: function (res) {
          detalleArticulo.empty()
          if (urlGet === '/articulos/tipos/ropa-list') {
            res.forEach(res => {
              detalleArticulo.append(`
                <option value='${res.ID_TIPOSROPA}'> ${res.DESC_TIPOSROPA} </option>
              `)
            })
          }
          else if (urlGet === '/articulos/tipos/calzado-list') {
            res.forEach(res => {
              detalleArticulo.append(`
                <option value='${res.ID_TIPOCALZADO}'> ${res.DESC_TIPOCALZADO} </option>
              `)
            })
          }
          else {
            res.forEach(res => {
              detalleArticulo.append(`
                <option value='${res.ID_TIPOACCESORIO}'> ${res.DESC_TIPOACCESORIO} </option>
              `)
            })
          }
        }
      })
    }
  }

  
  tipoArticulo.on('change', function () {
    

    if (this.value === '1') {
      var url = '/articulos/tipos/ropa-list'
      detalleArticulo.prop('name', 'id_tiposropa')
    }
    else if (this.value === '2') {
      var url = '/articulos/tipos/calzado-list'
      detalleArticulo.prop('name', 'id_tipocalzado')
    }
    else if (this.value === '3') {
      var url = '/articulos/tipos/accesorios-list'
      detalleArticulo.prop('name', 'id_tipoaccesorio')
    }
    else {
      var url = 'none'
      detalleArticulo.empty()
      detalleArticulo.append(`<option value='0' selected>  - Seleccione Detalle - </option>`)
      detalleArticulo.prop('name', 'temp')
    }

    urlTipoArticulo(url)
  
    
  });
})
