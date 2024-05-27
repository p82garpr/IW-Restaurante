const {Schema, model} = require('mongoose')

const comandaSchema = new Schema({
    id_usuario: {type: Schema.Types.ObjectId, ref: 'Usuario'},
    productos: [
        {
            producto: { type: Schema.Types.ObjectId, ref: 'Producto' },
            cantidad: Number
        }
    ],
    hora: String,
    fecha: Date,
    comentarios: String,
    precio_total: Number,
    estado:{type: String, enum: ['porPagar', 'porServir','servida'] }
        
},
{
    timestamps: true
})

module.exports = model('Comanda', comandaSchema)