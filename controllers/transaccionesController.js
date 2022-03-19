const myConn = require('../db')
const transaccionController = {}

/** METODOS DE PAGO **/

transaccionController.listMetodosPago = async (req, res) => {
    const modo_pago = await myConn.query("SELECT * FROM modo_pago")
    res.render('transacciones/metodo-pago', { modo_pago })
}

transaccionController.newMetodoPago = async (req, res) => {
    const { desc_modopago } = req.body
    const newModoPago = {
      desc_modopago,
    }

    await myConn.query("INSERT INTO modo_pago set ?", [newModoPago]);

    req.flash("success", "Metodo de Pago Agregado Correctamente")

    res.redirect("/transacciones/metodos-pago");
}

// JSON Tipos Metodos Pago
transaccionController.getMetodoPago = async (req, res) => {
  const { id } = req.params

  const modo_pago = await myConn.query("SELECT * FROM modo_pago WHERE id_modopago = ?", [id])

  res.json(modo_pago)
}

//  -------- Eliminar Metodo de Pago
transaccionController.deleteMetodoPago = async (req, res) => {
  const { id } = req.params;
  await myConn.query("DELETE FROM modo_pago WHERE id_modopago = ?", [id],
  (error, results) => {
    if (error) {
        req.flash("warning", "El Metodo de Pago seleccionado no puede ser eliminado");
        res.redirect("/transacciones/metodos-pago");  
    }
    else {
        req.flash("success", "Metodo de Pago Eliminado Correctamente");
        res.redirect("/transacciones/metodos-pago");
    }
  });
  
}

// ------- EDITAR METODO DE PAGO
transaccionController.editMetodoPago = async (req, res) => {
  const { id } = req.params;
  const { desc_modopago } = req.body;
  const newModoPago = {
    desc_modopago,
  };
  await myConn.query("UPDATE modo_pago set ? WHERE id_modopago = ?", [
    newModoPago,
    id,
  ])

  req.flash("success", "Modo Pago Actualizado Correctamente");
  res.redirect("/transacciones/metodos-pago");
}

/* ------------------------- Transacciones ----------------------------- */

// Compra a proveedores
transaccionController.newCompra = async (req, res) => {
  res.render('transacciones/comprar')
}

// ------------------------ Registrar Compra a Proveedor ----------------- //
transaccionController.agregarCompra = async (req, res) => {
  const { id_proveedor, id_articulo, cantidad, precio_compra, filas } = req.body

  // Almacenar Compra del articulo
  const newCompraArticulo = {
    id_proveedor
  }

  await myConn.query("INSERT INTO compra_articulo set ?", [newCompraArticulo]);

  // Capturar el ID de la ultima compra generada
  const idCompraQuery = `SELECT ID_COMPRA FROM compra_articulo
                        ORDER BY ID_COMPRA DESC
                        LIMIT 1`;

  // Almacenar el valor del ID de la ultima Compra
  const idCompra = await myConn.query(idCompraQuery);

  // Insertar en Compra Articulo Detalle
  const detalleCompraQuery = 
    `
      INSERT INTO compra_articulo_detalle (ID_COMPRA, ID_ARTICULO, CANTIDAD, PRECIO_COMPRA) 
      VALUES (?, ?, ?, ?)
    `;

  // Si filas === 1 el carrito tiene solamente 1 producto
  if (filas === '1') {

    // Insertar en Tabla normal
    await myConn.query(detalleCompraQuery, [idCompra[0].ID_COMPRA, id_articulo, cantidad, precio_compra])

    // Actualizar en Stock
    await myConn.query(`UPDATE articulos set STOCK = (STOCK + ?) 
    WHERE ID_ARTICULO = ?;`, [cantidad, id_articulo])

  }
  // Si no, el carrito tiene mas de 1 producto
  else {
    let idArticulo = Object.values(id_articulo)
    let amount = Object.values(cantidad)
    let price = Object.values(precio_compra)


    for (index in idArticulo) {
      await myConn.query(detalleCompraQuery, [
        idCompra[0].ID_COMPRA,
        idArticulo[index],
        amount[index],
        price[index]
      ])
    }

    // Actualizar Stock
    const updateStockQuery = `UPDATE articulos set STOCK = (STOCK + ?) 
    WHERE ID_ARTICULO = ?;`;

    for (key in id_articulo) {
      await myConn.query(updateStockQuery, [amount[key], idArticulo[key]]);
    }
  }

  req.flash("success", "Compra almacenada satisfactoriamente")
  res.redirect('/transacciones/compras/new')
}

// -------------------- Registrar una Nueva Factura ------------------------------ //
transaccionController.agregarFactura = async (req, res) => {
  const { 
    id_persona, 
    id_empleado, 
    id_modopago, 
    id_articulo, 
    cantidad, 
    precio_unit, 
    filas } = req.body

    // Almacenar nueva factura
    const newFactura = {
      id_persona,
      id_empleado,
      id_modopago
    }

    // Guardar Factura General
    await myConn.query("INSERT INTO factura set ?", [newFactura])

    // Capturar ID de Factura
    const idVentaQuery = `SELECT ID_FACTURA FROM factura
                        ORDER BY ID_FACTURA DESC
                        LIMIT 1`

    const idVenta = await myConn.query(idVentaQuery)

    // Insertar Venta Factura_Detalle
    const detalleVentaQuery = 
    `
    INSERT INTO factura_detalle (ID_FACTURA, ID_ARTICULO, CANTIDAD, PRECIO_UNIT) 
    VALUES (?, ?, ?, ?)
    `;

    if (filas === '1') {
      await myConn.query(detalleVentaQuery, [idVenta[0].ID_FACTURA, id_articulo, cantidad, precio_unit])

      // Actualizar en Stock
      await myConn.query(`UPDATE articulos set STOCK = (STOCK - ?) 
      WHERE ID_ARTICULO = ?;`, [cantidad, id_articulo])

    }
    else {
      let idArticulo = Object.values(id_articulo);
      let amount = Object.values(cantidad);
      let price = Object.values(precio_unit);

      for (index in idArticulo) {
        await myConn.query(detalleVentaQuery, [
          idVenta[0].ID_FACTURA,
          idArticulo[index],
          amount[index],
          price[index],
        ]);
      }

      // Actualizar Stock
      const updateStockQuery = `UPDATE articulos set STOCK = (STOCK - ?) 
                            WHERE ID_ARTICULO = ?;`;

      for (key in idArticulo) {
        await myConn.query(updateStockQuery, [amount[key], idArticulo[key]]);
      }
    }

    req.flash("success", "Venta registrada satisfactoriamente")
    res.redirect('/transacciones/facturas/new')


}

// Facturar un producto
transaccionController.newFactura = async (req, res) => {
  const metodopago = await myConn.query("SELECT * FROM modo_pago");
  res.render('transacciones/facturar', {metodopago})
}


module.exports = transaccionController