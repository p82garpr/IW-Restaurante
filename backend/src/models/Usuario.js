const {Schema, model} = require('mongoose')

const usuarioSchema = new Schema({
    nombre_usuario: String,
    nombre: String,
    apellido: String,
    contraseña: String,
    fecha_nacimiento: Date,
    privilegio: Number,
    rol: { type: String, enum: ['cliente', 'administrador'] },
    cliente_info: {
        saldo: { type: Number, default: 0 },
        id_mesa: {type: Schema.Types.ObjectId, ref: 'Mesa'},
    },
        
},
{
    timestamps: true
})

module.exports = model('Usuario', usuarioSchema)