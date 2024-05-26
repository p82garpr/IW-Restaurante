const {Schema, model} = require('mongoose')

const mesaSchema = new Schema({
    numero_mesa: Number,
    estado: { type: String, enum: ['Libre', 'Ocupada'] },
    capacidad: Number,
    QR: String

    
        
},
{
    timestamps: true
})

module.exports = model('Mesa', mesaSchema)