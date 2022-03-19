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

  req.flash("success", "Compra almacenada correctamente satisfactoriamente")
  res.redirect('/transacciones/compras/new')
}


// Facturar un producto
transaccionController.newFactura = async (req, res) => {
  const metodopago = await myConn.query("SELECT * FROM modo_pago");
  res.render('transacciones/facturar', {metodopago})
}


module.exports = transaccionController