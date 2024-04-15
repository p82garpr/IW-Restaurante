const {Schema, model} = require('mongoose')

const categoriaSchema = new Schema({
    nombre: { type: String, enum: ['entrante', 'principal', 'postre', 'bebida'] },
    imagen: Buffer,
    categoria: { type: String, enum: ['entrante', 'principal', 'postre', 'bebida'] },
    descripcion: String, // Descripción específica para los productos de comida
    ingredientes: { type: [String], default: [] } // Ingredientes específicos para los productos de comida
    
        
},
{
    timestamps: true
})

module.exports = model('Producto', productoSchema)