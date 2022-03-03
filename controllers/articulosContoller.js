const myConn = require('../db')
const artController = {}


// Articulos Listar 
artController.listArticulos = async (req, res) => {
    const queryArt = `SELECT articulos.*, marca.NOMBRE_MARCA
                    FROM articulos
                    INNER JOIN marca ON articulos.ID_MARCA = articulos.ID_MARCA;`
    const articulos = await myConn.query(queryArt)
    res.render('articulos/items/items', { articulos })
}

// Marcas Listar
artController.listMarcas = async (req, res) => {
    const marca = await myConn.query("SELECT * FROM marca;")
    res.render('articulos/marca/marca', { marca })
}

module.exports = artController