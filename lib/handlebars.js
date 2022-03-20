const format = require('date-format')

const helpers = {}

helpers.format = (fecha) => {
    return format("dd/MM/yyyy", fecha)
}


module.exports = helpers