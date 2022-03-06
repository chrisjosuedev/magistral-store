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

module.exports = transaccionController