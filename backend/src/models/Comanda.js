const {Schema, model} = require('mongoose')

const comandaSchema = new Schema({
    fecha: Date,
    comentarios: String,
    precio_total: Number,
    estado:{type: String, enum: ['porPagar', 'porServir','servida'] }
        
},
{
    timestamps: true
})

module.exports = model('Comanda', comandaSchema)