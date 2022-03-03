const myConn = require('../db')
const confController = {}

confController.listCategoriaLaboral = async (req, res) => {
    const categoria_laboral = await myConn.query("SELECT * FROM categoria_laboral")
    res.render('config/categoria-laboral', { categoria_laboral })
}

confController.listUsuarios = async (req, res) => {
    const userQuery = `SELECT usuario.USERNAME, rol_users.DESC_ROL, 
                        concat_ws(' ', persona.    NOMBRE_PERSONA, persona.APELLIDO_PERSONA) as NOMBRE_EMPLEADO
                        FROM usuario 
                        INNER JOIN rol_users ON rol_users.ID_ROL = usuario.ID_ROL
                        INNER JOIN empleado ON usuario.ID_EMPLEADO = empleado.ID_EMPLEADO
                        INNER JOIN persona ON persona.ID_PERSONA = empleado.ID_PERSONA`
    const usuario = await myConn.query(userQuery)
    res.render('config/usuario', { usuario })
}

module.exports = confController