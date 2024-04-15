const productoCtrl = {}

const Producto = require('../models/Producto')

productoCtrl.getProd = async (req, res) => {
    try {
        const productos = await Producto.find()
        res.json(productos)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

productoCtrl.createProd = async (req, res) => {
    const { nombre, precio, imagen, categoria, descripcion, ingredientes} = req.body;

    try {
        const newProd = new Producto({
            nombre,
            precio,
            imagen,
            categoria,
            descripcion: ['entrante', 'principal', 'postre'].includes(categoria) ? descripcion : '',
            ingredientes: ['entrante', 'principal', 'postre'].includes(categoria) ? ingredientes : []
        });

        await newProd.save();
        res.json({ message: "El producto ha sido creado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

productoCtrl.getProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdcd (req.params.id)
        res.json(producto)
    } catch (error) {
        res.status(404).json({ message: "Producto no encontrado" });
    }
}

productoCtrl.deleteProd = async (req, res) => {
    try {
        await Producto.findByIdAndDelete(req.params.id)
        res.json({ message: 'Producto ha sido eliminado' })
    } catch (error) {
        res.status(404).json({ message: "Producto no encontrado" });
    }
}

productoCtrl.updateProd = async (req, res) => {
    const { nombre, precio, imagen, categoria, descripcion, ingredientes} = req.body;

    try {
        await Producto.findByIdAndUpdate(req.params.id, {
            nombre,
            precio,
            imagen,
            categoria,
            descripcion: ['entrante', 'principal', 'postre'].includes(categoria) ? descripcion : '',
            ingredientes: ['entrante', 'principal', 'postre'].includes(categoria) ? ingredientes : []
        })
        res.json({ message: 'El producto ha sido actualizado' })
    } catch (error) {
        res.status(404).json({ message: "Producto no encontrado" });
    }
}

module.exports = productoCtrl
