const express = require('express')
const session = require('express-session');
const cors = require('cors')
const app = express();

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
    
}));
const corsOptions = { 
    origin: 'http://localhost:3000',
    credentials: true
}
app.use(cors(corsOptions));
// Configuración
app.set('port', process.env.PORT || 4000)

// Middlewares

app.use(express.json())


// Rutas
app.get('/', (req, res) => {
    res.send('Bienvenido a mi API RESTful');
})

// Configuración de express-session


// Rutas para la API
app.use('/api/usuarios', require('./routes/usuario'))
app.use('/api/productos', require('./routes/producto'))
app.use('/api/categorias', require('./routes/categoria'))
app.use('/api/cesta', require('./routes/cesta'))
app.use('/api/mesa', require('./routes/mesa'))


app.use(express.static('public'));

// Verificación de la configuración de la sesión
app.use((req, res, next) => {
    //console.log(req.session); // Verifica si la sesión se está inicializando correctamente
    next();
});

module.exports = app;