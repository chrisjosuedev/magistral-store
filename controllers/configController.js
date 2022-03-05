const myConn = require('../db')
const helpers = require('../lib/helpers')
const confController = {}

confController.listCategoriaLaboral = async (req, res) => {
    const categoria_laboral = await myConn.query("SELECT * FROM categoria_laboral")
    res.render('config/categoria-laboral', { categoria_laboral })
}

confController.newCategoriaLaboral = async (req, res) => {
    const { descripcion_categoria, salario } = req.body;
    const newCategoriaLaboral = {
        descripcion_categoria,
        salario,
    }
    await myConn.query("INSERT INTO categoria_laboral set ?", [newCategoriaLaboral]);
    req.flash("success", "Categoria Agregada Correctamente");
    res.redirect("/config/categoria-laboral");
}

confController.listUsuarios = async (req, res) => {
    const userQuery = `SELECT usuario.USERNAME, rol_users.DESC_ROL, 
                        concat_ws(' ', persona.    NOMBRE_PERSONA, persona.APELLIDO_PERSONA) as NOMBRE_EMPLEADO
                        FROM usuario 
                        INNER JOIN rol_users ON rol_users.ID_ROL = usuario.ID_ROL
                        INNER JOIN empleado ON usuario.ID_EMPLEADO = empleado.ID_EMPLEADO
                        INNER JOIN persona ON persona.ID_PERSONA = empleado.ID_PERSONA`

    const usuario = await myConn.query(userQuery)

    const roles = await myConn.query("SELECT * FROM rol_users")

    res.render('config/usuario', { usuario, roles })
}

/** POST NUEVO USUARIO **/
confController.newUsuario = async (req, res) => {
    const { id_empleado, username, password, id_rol } = req.body
    const newUser = {
      id_empleado,
      username,
      password,
      id_rol,
    };
  
    // Cifrar Contraseña
    newUser.password = await helpers.encryptPassword(password)
  
    await myConn.query("INSERT INTO usuario set ?", [newUser])
    req.flash("success", "Usuario Guardado Correctamente")
    res.redirect("/config/usuarios");
}

module.exports = confController