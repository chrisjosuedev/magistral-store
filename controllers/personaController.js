const myConn = require('../db')
const personaController = {}

// Persona

// Clientes
personaController.listClientes = async (req, res) => { 
    const clientesQuery = `SELECT persona.ID_PERSONA, concat_ws(' ', persona.NOMBRE_PERSONA, persona.APELLIDO_PERSONA) as CLIENTE, (if(persona.SEXO = 1, 'F', 'M')) as SEXO, persona.CELULAR, 
    concat_ws(', ', persona.DIRECCION_RESIDENCIA, ciudad.NOMBRE_CIUDAD, 
    concat(upper(LEFT(departamentos.NOMBRE_DEPTO, 1)), lower(substring(departamentos.NOMBRE_DEPTO, 2)))) AS DOMICILIO
    FROM persona
    left join empleado on persona.ID_PERSONA = empleado.ID_PERSONA 
    INNER JOIN ciudad on persona.ID_CIUDAD = ciudad.ID_CIUDAD and ciudad.ID_DEPTO = persona.ID_DEPTO
    INNER JOIN departamentos on persona.ID_DEPTO = departamentos.ID_DEPTO
    WHERE (persona.ID_PERSONA NOT IN (SELECT empleado.ID_PERSONA FROM empleado));`

    const persona_cliente = await myConn.query(clientesQuery)

    res.render('persona/clientes', { persona_cliente })

}

personaController.listEmpleados = async (req, res) => {
    const empleadoQuery = `SELECT persona.ID_PERSONA, concat_ws(' ', persona.NOMBRE_PERSONA, persona.APELLIDO_PERSONA) as EMPLEADOS, 
	(if(persona.SEXO = 1, 'F', 'M')) as SEXO, persona.CELULAR,
    empleado.ID_EMPLEADO, 
    categoria_laboral.DESCRIPCION_CATEGORIA, categoria_laboral.SALARIO, empleado.FECHA_CONTRATACION 
    FROM persona 
    INNER JOIN empleado on persona.ID_PERSONA = empleado.ID_PERSONA
    INNER JOIN categoria_laboral on empleado.ID_CATEGORIA = categoria_laboral.ID_CATEGORIA
    INNER JOIN ciudad on persona.ID_CIUDAD = ciudad.ID_CIUDAD and ciudad.ID_DEPTO = persona.ID_DEPTO
    INNER JOIN departamentos on persona.ID_DEPTO = departamentos.ID_DEPTO`

    const persona_empleado = await myConn.query(empleadoQuery)

    res.render('persona/empleado', { persona_empleado })
}

// JSON Empleado por ID
personaController.getEmpleadobyId = async (req, res) => {
    const { id } = req.params
    const queryEmp = `SELECT empleado.*, 
                      concat_ws(' ', persona.NOMBRE_PERSONA, persona.APELLIDO_PERSONA) as NOMBRE_EMPLEADO
                      FROM empleado
                      INNER JOIN persona ON persona.ID_PERSONA = empleado.ID_PERSONA
                      WHERE empleado.ID_PERSONA = ?`
    const empJSON = await myConn.query(queryEmp, [id]);
    res.json(empJSON)
}


module.exports = personaController