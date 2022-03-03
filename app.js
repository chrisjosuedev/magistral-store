const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const path = require('path')

// DB Conection Variables
const { database } = require('./keys')

// Config Port
const app = express()

app.set('port', process.env.PORT || 3000)

// View Engine Handlebars
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))

app.set('view engine', '.hbs')

// Middlewares
app.use(morgan('dev'))

// Routes
app.use(require('./routes'))
app.use('/dashboard', require('./routes/dashboard'))
app.use('/articulos', require('./routes/articulos'))
app.use('/config', require('./routes/config'))

// Public
app.use(express.static(path.join(__dirname, 'public')))

app.listen(app.get('port'), () => {
    console.log('Server on Port', app.get('port'))
})