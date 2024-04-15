const categoriaCtrl = {}

const Catgeoria = require('../models/Categoria')

categoriaCtrl.getCateg = async (req, res) => {
    try {
        const categorias = await Categoria.find()
        res.json(categorias)
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

categoriaCtrl.getCategoria = async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id)
        res.json(categoria)
    } catch (error) {
        res.status(404).json({ message: "Categoria no encontrada" });
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

module.exports = categoriaCtrl
