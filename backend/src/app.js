const express = require('express')
const session = require('express-session');
const cors = require('cors')
const app = express();

//configuracion
app.set('port', process.env.PORT || 4000)

//middlewares
app.use(cors())
app.use(express.json())

//rutas

app.get('/',(req,res)=>{
    res.send('Bienvenido a mi api rest full');
})

// Configuración de express-session
app.use(session({
    secret: 'mi_clave_secreta', // Cadena secreta para firmar la cookie de sesión
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Configuración de la cookie de sesión
}));

// ruta para nuestra api de usuarios
app.use('/api/usuarios', require('./routes/usuario'))

// ruta para nuestra api de productos
app.use('/api/productos', require('./routes/producto'))

app.use('/api/categorias', require('./routes/categoria'))

app.use('/api/cesta', require('./routes/cesta'))

app.use(express.static('public'));


module.exports = app;
