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

module.exports = transaccionController