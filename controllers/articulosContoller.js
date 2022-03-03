const myConn = require('../db')
const artController = {}


// Articulos Listar 
artController.listArticulos = async (req, res) => {
    const queryArt = `SELECT articulos.*, marca.NOMBRE_MARCA
                    FROM articulos
                    INNER JOIN marca ON articulos.ID_MARCA = articulos.ID_MARCA;`
    const articulos = await myConn.query(queryArt)
    res.render('articulos/items', { articulos })
}

// Marcas Listar
artController.listMarcas = async (req, res) => {
    const marca = await myConn.query("SELECT * FROM marca;")
    res.render('articulos/marca', { marca })
}

// Colores Listar
artController.listColores = async (req, res) => {
    const color_articulo = await myConn.query("SELECT * FROM color_articulo")
    res.render('articulos/colores', { color_articulo })
}

/* Tipos de Articulo List */
// Ropa
artController.listRopa = async (req, res) => {
    const tipos_ropa = await myConn.query("SELECT * FROM tipos_ropa")
    res.render('articulos/tipos/ropa', { tipos_ropa })
}

// Calzado
artController.listCalzado = async (req, res) => {
    const tipos_calzado = await myConn.query("SELECT * FROM tipos_calzado")
    res.render('articulos/tipos/calzado', { tipos_calzado })
}

// Accesorios
artController.listAccesorios = async (req, res) => {
    const tipos_accesorios = await myConn.query("SELECT * FROM tipos_accesorios")
    res.render('articulos/tipos/accesorios', { tipos_accesorios })
}

/* Fin Tipos de Articulos */

// Proveedores
artController.listProveedores = async (req, res) => {
    const proveedores = await myConn.query("SELECT * FROM proveedores")
    res.render('articulos/proveedores', { proveedores })
}


module.exports = artController