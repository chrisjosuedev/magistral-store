const myConn = require('../db')
const consultasController = {}

/* ------------------------- COMPRAS ----------------------------- */

// Listar todas las compras
consultasController.listCompras = async (req, res) => {
  const comprasQuery = `SELECT compra_articulo.*, proveedores.NOMBRE_PROVEEDOR
  FROM compra_articulo
  INNER JOIN proveedores ON compra_articulo.ID_PROVEEDOR = proveedores.ID_PROVEEDOR
  GROUP BY compra_articulo.ID_COMPRA
  ORDER BY compra_articulo.ID_COMPRA ASC;`;
  const compras = await myConn.query(comprasQuery);
  res.render("consultas/compras/general", { compras });
}

// JSON de todas las compras
consultasController.totalCompras = async (req, res) => {
  const comprasQuery = `SELECT compra_articulo.*, proveedores.NOMBRE_PROVEEDOR
  FROM compra_articulo
  INNER JOIN proveedores ON compra_articulo.ID_PROVEEDOR = proveedores.ID_PROVEEDOR
  GROUP BY compra_articulo.ID_COMPRA
  ORDER BY compra_articulo.ID_COMPRA ASC;`;
  const compras = await myConn.query(comprasQuery);
  res.json(compras);
}

// Filtrado de Compras por Fecha
consultasController.findCompraByDate = async (req, res) => {
  const { fechain, fechaout } = req.params

  const comprasDateQuery = `
  SELECT compra_articulo.*, proveedores.NOMBRE_PROVEEDOR
  FROM compra_articulo
  INNER JOIN proveedores ON compra_articulo.ID_PROVEEDOR = proveedores.ID_PROVEEDOR
  WHERE compra_articulo.FECHA BETWEEN ? AND ?
  GROUP BY compra_articulo.ID_COMPRA
  `
  const compras = await myConn.query(comprasDateQuery, [fechain, fechaout])
  res.json(compras)
}

// Detalle Compra
consultasController.getCompraByID = async (req, res) => {
  const { id } = req.params;
  const queryDetails = `
    SELECT compra_articulo_detalle.ID_COMPRA, compra_articulo_detalle.ID_ARTICULO, 
    articulos.DESCRIPCION,
    compra_articulo_detalle.CANTIDAD, compra_articulo_detalle.PRECIO_COMPRA,
    round(sum(compra_articulo_detalle.CANTIDAD * compra_articulo_detalle.PRECIO_COMPRA), 2) as  SUBTOTAL
    FROM compra_articulo_detalle
    INNER JOIN articulos ON articulos.ID_ARTICULO = compra_articulo_detalle.ID_ARTICULO
    WHERE ID_COMPRA = ?
    GROUP BY compra_articulo_detalle.ID_ARTICULO
  `;

  const compraDetails = await myConn.query(queryDetails, [id]);

  const querySubISV = `SELECT @subtotal:=round(sum(compra_articulo_detalle.CANTIDAD * compra_articulo_detalle.PRECIO_COMPRA), 2), 
                        @isv:=round(sum(compra_articulo_detalle.CANTIDAD * compra_articulo_detalle.PRECIO_COMPRA) * 0.15, 2)
                        FROM compra_articulo_detalle WHERE ID_COMPRA = ?;`;

  const queryTotal = `SELECT compra_articulo_detalle.ID_COMPRA, @subtotal as SUBTOTAL, @isv as ISV, round((@subtotal + @isv), 2) as TOTAL
                      FROM compra_articulo_detalle WHERE ID_COMPRA = ? GROUP BY compra_articulo_detalle.ID_COMPRA;`;

  await myConn.query(querySubISV, [id]);

  const compraTotal = await myConn.query(queryTotal, [id]);

  res.render("consultas/compras/detalle", {
    compraDetails,
    compraTotal: compraTotal[0],
  });

}



module.exports = consultasController