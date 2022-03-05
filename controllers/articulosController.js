const myConn = require('../db')
const artController = {}

/* ----------- ARTICULOS --------------- */

// Articulos Listar 
artController.listArticulos = async (req, res) => {
    const queryArt = `SELECT articulos.*, marca.NOMBRE_MARCA, linea_articulo.DESC_LINEA, color_articulo.DESC_COLOR
    FROM articulos
    INNER JOIN marca ON marca.ID_MARCA = articulos.ID_MARCA
    INNER JOIN linea_articulo ON linea_articulo.ID_LINEA_ARTICULO = articulos.ID_LINEA_ARTICULO
    INNER JOIN color_articulo ON color_articulo.ID_COLOR = articulos.ID_COLOR
    GROUP BY articulos.ID_ARTICULO
    ORDER BY articulos.ID_ARTICULO ASC;`
    const articulos = await myConn.query(queryArt)

    // Consultas para Selects
    const color = await myConn.query("SELECT * FROM color_articulo")
    const marca = await myConn.query("SELECT * FROM marca")
    const linea_articulo = await myConn.query("SELECT * FROM linea_articulo")

    res.render('articulos/items', { articulos, color, marca, linea_articulo })
}

// Ropa Listar
artController.listRopaArticulos = async (req, res ) => {
    const queryRopa = `SELECT ropa.*, articulos.*, marca.NOMBRE_MARCA, linea_articulo.DESC_LINEA, color_articulo.DESC_COLOR, 
	tipos_ropa.DESC_TIPOSROPA
    FROM ropa
    INNER JOIN articulos ON articulos.ID_ARTICULO = ropa.ID_ARTICULO
    INNER JOIN marca ON marca.ID_MARCA = articulos.ID_MARCA
    INNER JOIN linea_articulo ON linea_articulo.ID_LINEA_ARTICULO = articulos.ID_LINEA_ARTICULO
    INNER JOIN color_articulo ON color_articulo.ID_COLOR = articulos.ID_COLOR
    INNER JOIN tipos_ropa ON ropa.ID_TIPOSROPA = tipos_ropa.ID_TIPOSROPA
    GROUP BY articulos.ID_ARTICULO
    ORDER BY articulos.ID_ARTICULO ASC;`


    // Consultas para Selects
    const color = await myConn.query("SELECT * FROM color_articulo")
    const marca = await myConn.query("SELECT * FROM marca")
    const linea_articulo = await myConn.query("SELECT * FROM linea_articulo")
    const tipos_ropa = await myConn.query("SELECT * FROM tipos_ropa")

    // Consulta Ropa
    const ropa = await myConn.query(queryRopa)

    res.render('articulos/ropa', { ropa, color, marca, linea_articulo, tipos_ropa })
}

// Calzado Listar
artController.listRopaCalzado = async (req, res ) => {
    const queryCalzado = `SELECT calzado.*, articulos.*, marca.NOMBRE_MARCA, linea_articulo.DESC_LINEA, color_articulo.DESC_COLOR,
	tipos_calzado.DESC_TIPOCALZADO
    FROM calzado
    INNER JOIN articulos ON articulos.ID_ARTICULO = calzado.ID_ARTICULO
    INNER JOIN marca ON marca.ID_MARCA = articulos.ID_MARCA
    INNER JOIN linea_articulo ON linea_articulo.ID_LINEA_ARTICULO = articulos.ID_LINEA_ARTICULO
    INNER JOIN color_articulo ON color_articulo.ID_COLOR = articulos.ID_COLOR
    INNER JOIN tipos_calzado ON calzado.ID_TIPOCALZADO = tipos_calzado.ID_TIPOCALZADO
    GROUP BY articulos.ID_ARTICULO
    ORDER BY articulos.ID_ARTICULO ASC;`


    // Consultas para Selects
    const color = await myConn.query("SELECT * FROM color_articulo")
    const marca = await myConn.query("SELECT * FROM marca")
    const linea_articulo = await myConn.query("SELECT * FROM linea_articulo")
    const tipos_calzado = await myConn.query("SELECT * FROM tipos_calzado")

    // Consulta Ropa
    const calzado = await myConn.query(queryCalzado)

    res.render('articulos/calzado', { calzado, color, marca, linea_articulo, tipos_calzado })
}

// Accesorios Listar
artController.listRopaAccesorio = async (req, res ) => {
    const queryAccesorios = `SELECT accesorios.*, articulos.*, marca.NOMBRE_MARCA, linea_articulo.DESC_LINEA, color_articulo.DESC_COLOR,
	tipos_accesorios.DESC_TIPOACCESORIO
    FROM accesorios
    INNER JOIN articulos ON articulos.ID_ARTICULO = accesorios.ID_ARTICULO
    INNER JOIN marca ON marca.ID_MARCA = articulos.ID_MARCA
    INNER JOIN linea_articulo ON linea_articulo.ID_LINEA_ARTICULO = articulos.ID_LINEA_ARTICULO
    INNER JOIN color_articulo ON color_articulo.ID_COLOR = articulos.ID_COLOR
    INNER JOIN tipos_accesorios ON accesorios.ID_TIPOACCESORIO = tipos_accesorios.ID_TIPOACCESORIO
    GROUP BY articulos.ID_ARTICULO
    ORDER BY articulos.ID_ARTICULO ASC;`


    // Consultas para Selects
    const color = await myConn.query("SELECT * FROM color_articulo")
    const marca = await myConn.query("SELECT * FROM marca")
    const linea_articulo = await myConn.query("SELECT * FROM linea_articulo")
    const tipos_accesorios = await myConn.query("SELECT * FROM tipos_accesorios")

    // Consulta Ropa
    const accesorios = await myConn.query(queryAccesorios)

    res.render('articulos/accesorios', { accesorios, color, marca, linea_articulo, tipos_accesorios })
}



/* POST */

// Articulos Ropa Agregar
artController.newRopa = async (req, res) => {
    const { 
        descripcion, 
        precio_unit, 
        talla, 
        id_marca,
        id_color,
        id_linea_articulo,
        id_tiposropa, id_ban } = req.body

    // Nuevo Articulo
    const newArticulo = {
        descripcion, 
        precio_unit, 
        talla, 
        id_marca,
        id_color,
        id_linea_articulo,
    }

    await myConn.query("INSERT INTO articulos set ?", [newArticulo])

    // Seleccionar Ultimo Registro de Articulo
    const idArticuloQuery = `SELECT ID_ARTICULO FROM articulos
                            ORDER BY ID_ARTICULO DESC
                            LIMIT 1`

    const id_articulo = await myConn.query(idArticuloQuery)

    // Nueva Ropa

    await myConn.query("INSERT INTO ropa (ID_ARTICULO, ID_TIPOSROPA) VALUES (?, ?)", 
                        [id_articulo[0].ID_ARTICULO, id_tiposropa])

    req.flash("success", "Ropa Agregada Correctamente");

    // Redirect
    (id_ban === 'ropa') ? res.redirect("/articulos/ropa") : res.redirect("/articulos")

}

// Articulos Calzado Agregar
artController.newCalzado = async (req, res) => {
    const { 
        descripcion, 
        precio_unit, 
        talla, 
        id_marca,
        id_color,
        id_linea_articulo,
        id_tipocalzado, id_ban  } = req.body

    // Nuevo Articulo
    const newArticulo = {
        descripcion, 
        precio_unit,  
        talla, 
        id_marca,
        id_color,
        id_linea_articulo,
    }

    await myConn.query("INSERT INTO articulos set ?", [newArticulo])

    // Seleccionar Ultimo Registro de Articulo
    const idArticuloQuery = `SELECT ID_ARTICULO FROM articulos
                            ORDER BY ID_ARTICULO DESC
                            LIMIT 1`

    const id_articulo = await myConn.query(idArticuloQuery)

    // Nuevo Calzado

    await myConn.query("INSERT INTO calzado (ID_ARTICULO, ID_TIPOCALZADO) VALUES (?, ?)",
                        [id_articulo[0].ID_ARTICULO, id_tipocalzado])

    req.flash("success", "Calzado Agregado Correctamente");

    // Redirect
    (id_ban === 'calzado') ? res.redirect("/articulos/calzado") : res.redirect("/articulos")
  
}

// Articulos Accesorio Agregar
artController.newAccesorio = async (req, res) => {
    const { 
        descripcion, 
        precio_unit, 
        talla, 
        id_marca,
        id_color,
        id_linea_articulo,
        id_tipoaccesorio, id_ban } = req.body

    // Nuevo Articulo
    const newArticulo = {
        descripcion, 
        precio_unit, 
        talla, 
        id_marca,
        id_color,
        id_linea_articulo,
    }

    await myConn.query("INSERT INTO articulos set ?", [newArticulo])

    // Seleccionar Ultimo Registro de Articulo
    const idArticuloQuery = `SELECT ID_ARTICULO FROM articulos
                            ORDER BY ID_ARTICULO DESC
                            LIMIT 1`

    const id_articulo = await myConn.query(idArticuloQuery)

    // Nuevo Calzado

    await myConn.query("INSERT INTO accesorios (ID_ARTICULO, ID_TIPOACCESORIO) VALUES (?, ?)",
                        [id_articulo[0].ID_ARTICULO, id_tipoaccesorio])

    req.flash("success", "Accesorio Agregado Correctamente");

    // Redirect
    (id_ban === 'accesorio') ? res.redirect("/articulos/accesorios") : res.redirect("/articulos")

}


/* ------------- FIN ARTICULOS ------------- */

// Marcas Listar
artController.listMarcas = async (req, res) => {
    const marca = await myConn.query("SELECT * FROM marca;")
    res.render('articulos/marca', { marca })
}

artController.newMarca = async (req, res) => {
    const { nombre_marca } = req.body

    const newMarca = {
        nombre_marca
    }

    await myConn.query("INSERT INTO marca set ?", [newMarca])

    req.flash("success", "Marca Agregada Correctamente")

    res.redirect('/articulos/marcas')
}

/* ---------- COLORES ----------- */

// Colores Listar
artController.listColores = async (req, res) => {
    const color_articulo = await myConn.query("SELECT * FROM color_articulo")
    res.render('articulos/colores', { color_articulo })
}

artController.newColor = async(req, res) => {
    const { desc_color } = req.body

    const newColor = {
        desc_color
    }

    await myConn.query("INSERT INTO color_articulo set ?", [newColor])

    req.flash("success", "Color Agregado Correctamente")

    res.redirect('/articulos/colores')
}

/* Tipos de Articulo List */
// Ropa
artController.listRopa = async (req, res) => {
    const tipos_ropa = await myConn.query("SELECT * FROM tipos_ropa")
    res.render('articulos/tipos/ropa', { tipos_ropa })
}

artController.newTipoRopa = async (req, res) => {
    const { desc_tiposropa } = req.body

    const newTipoRopa = {
        desc_tiposropa
    }
    
    await myConn.query("INSERT INTO tipos_ropa set ?", [newTipoRopa])

    req.flash("success", "Tipo de Ropa Agregado Correctamente")

    res.redirect('/articulos/tipos/ropa')

}

// Calzado
artController.listCalzado = async (req, res) => {
    const tipos_calzado = await myConn.query("SELECT * FROM tipos_calzado")
    res.render('articulos/tipos/calzado', { tipos_calzado })
}

artController.newTipoCalzado = async (req, res) => {
    const { desc_tipocalzado } = req.body

    const newTipoCalzado = {
        desc_tipocalzado
    }

    await myConn.query("INSERT INTO tipos_calzado set ?", [newTipoCalzado])

    req.flash("success", "Tipo de Calzado Agregado Correctamente")

    res.redirect('/articulos/tipos/calzado')


}

// Accesorios
artController.listAccesorios = async (req, res) => {
    const tipos_accesorios = await myConn.query("SELECT * FROM tipos_accesorios")
    res.render('articulos/tipos/accesorios', { tipos_accesorios })
}

artController.newTipoAccesorio = async (req, res) => {
    const { desc_tipoaccesorio } = req.body

    const newTipoAccesorio = {
        desc_tipoaccesorio
    }

    await myConn.query("INSERT INTO tipos_accesorios set ?", [newTipoAccesorio])

    req.flash("success", "Tipo de Accesorio Agregado Correctamente")

    res.redirect('/articulos/tipos/accesorios')
}

// JSON Tipos de Cada Articulo

// Tipos de Ropa
artController.listTiposRopa = async (req, res) => {
    const tipos_ropa = await myConn.query("SELECT * FROM tipos_ropa")
    res.json(tipos_ropa)
}

// Tipos de Calzado
artController.listTiposCalzado = async (req, res) => {
    const tipos_calzado = await myConn.query("SELECT * FROM tipos_calzado")
    res.json(tipos_calzado)
}

// Tipos de Accesorios
artController.listTiposAccesorios = async (req, res) => {
    const tipos_accesorio = await myConn.query("SELECT * FROM tipos_accesorios")
    res.json(tipos_accesorio)
}

/* Fin Tipos de Articulos */

// Proveedores
artController.listProveedores = async (req, res) => {
    const proveedores = await myConn.query("SELECT * FROM proveedores")
    res.render('articulos/proveedores', { proveedores })
}

/* POST Proveedores */
artController.newProveedor = async (req, res) => {
    const { id_proveedor, 
        nombre_proveedor, 
        email_proveedor, 
        cel_proveedor } = req.body;

  const newProveedor = {
    id_proveedor,
    nombre_proveedor,
    email_proveedor,
    cel_proveedor,
  }

  await myConn.query("INSERT INTO proveedores set ?", [newProveedor])

  req.flash("success", "Proveedor Agregado Correctamente")

  res.redirect("/articulos/proveedores");
}


module.exports = artController