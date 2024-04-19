const {Schema, model} = require('mongoose')

const cestaSchema = new Schema({
    
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }, // Referencia al usuario
    productos:[],
    precio_total: Number
        
},
{
    timestamps: true
})

module.exports = model('Cesta', cestaSchema)