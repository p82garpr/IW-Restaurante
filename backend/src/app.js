const express = require('express')
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

// ruta para nuestra api de usuarios
app.use('/api/usuarios', require('./routes/usuario'))

// ruta para nuestra api de productos
app.use('/api/productos', require('./routes/producto'))


module.exports = app;
