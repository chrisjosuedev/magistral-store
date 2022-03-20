// Server, View Engine, Middleware Variables
const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const path = require('path')

// Session Variables
const flash = require('connect-flash')
const sessions = require('express-session')
const MySqlStore = require('express-mysql-session')

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
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))

app.set('view engine', '.hbs')

// Middlewares
app.use(morgan('dev'))

app.use(sessions({
    secret: 'test',
    resave: false,
    saveUninitialized: false,
    store: new MySqlStore(database)
}))

app.use(flash())
app.use(express.urlencoded({
    extended: false
}))

app.use((req, res, next) => {
    app.locals.success = req.flash('success')
    app.locals.warning = req.flash('warning')
    app.locals.user = req.user
    next()
})

// Routes
app.use(require('./routes'))
app.use('/dashboard', require('./routes/dashboard'))
app.use('/articulos', require('./routes/articulos'))
app.use('/proveedores', require('./routes/proveedores'))
app.use('/config', require('./routes/config'))
app.use('/transacciones', require('./routes/transacciones'))
app.use('/persona', require('./routes/persona'))
app.use('/consultas', require('./routes/consultas'))

// Public
app.use(express.static(path.join(__dirname, 'public')))

app.listen(app.get('port'), () => {
    console.log('Server on Port', app.get('port'))
})