const myConn = require('../db')
const sysController = {}

sysController.general = async(req, res) => {
  const queryEmpresa = `
  SELECT empresa.*, upper(ciudad.NOMBRE_CIUDAD) as CIUDAD, departamentos.NOMBRE_DEPTO
  FROM empresa
  INNER JOIN ciudad on empresa.ID_CIUDAD = ciudad.ID_CIUDAD and ciudad.ID_DEPTO = empresa.ID_DEPTO
  INNER JOIN departamentos on empresa.ID_DEPTO = departamentos.ID_DEPTO
  `

  const empresa = await myConn.query(queryEmpresa)


  res.render('sys/general', { empresa: empresa[0] })
}


module.exports = sysController