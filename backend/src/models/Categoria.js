const {Schema, model} = require('mongoose')

const categoriaSchema = new Schema({
    nombre: { type: String, enum: ['entrante', 'principal', 'postre', 'bebida'] },
    imagen: Buffer,

        
},
{
    timestamps: true
})

module.exports = model('Categoria', categoriaSchema)