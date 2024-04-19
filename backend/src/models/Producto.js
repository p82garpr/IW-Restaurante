const {Schema, model} = require('mongoose')

const productoSchema = new Schema({
    nombre: String,
    precio: Number,
    imagen: Buffer,
    categoria: { type: Schema.Types.ObjectId, ref: 'Categoria' }, // Referencia a la categoría
    descripcion: String, // Descripción específica para los productos de comida
    ingredientes: { type: [String], default: [] } // Ingredientes específicos para los productos de comida
    
        
},
{
    timestamps: true
})

module.exports = model('Producto', productoSchema)