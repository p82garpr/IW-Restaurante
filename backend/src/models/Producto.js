const {Schema, model} = require('mongoose')

const productoSchema = new Schema({
    nombre: String,
    precio: Number,
    imagen: Buffer,
    categoria: { type: String, enum: ['entrante', 'principal', 'postre', 'bebida'] },
    descripcion: String, // Descripción específica para los productos de comida
    ingredientes: { type: [String], default: [] } // Ingredientes específicos para los productos de comida
    
        
},
{
    timestamps: true
})

module.exports = model('Producto', productoSchema)