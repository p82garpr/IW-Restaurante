const {Schema, model} = require('mongoose')

const usuarioSchema = new Schema({
    nombre_usuario: String,
    nombre: String,
    apellido: String,
    contraseña: String,
    fecha_nacimiento: Date,
    privilegio: Number,
    id_mesa: Number
},
{
    timestamps: true
})

module.exports = model('Usuario', usuarioSchema)