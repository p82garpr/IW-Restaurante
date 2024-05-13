const {Schema, model} = require('mongoose')

const comandaSchema = new Schema({
    fecha: Date,
    comentarios: String,
    precio_total: Number
        
},
{
    timestamps: true
})

module.exports = model('Comanda', comandaSchema)