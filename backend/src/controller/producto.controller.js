const productoCtrl = {};

const Producto = require('../models/Producto');
const Categoria = require('../models/Categoria');

productoCtrl.getProd = async (req, res) => {
    try {
        let productos;
        if (req.params.categoria) {
            // Buscar el ObjectId de la categoría por su nombre
            const categoria = await Categoria.findOne({ nombre: req.params.categoria });
            
            if (!categoria) {
                // Si la categoría no existe, retornar un array vacío de productos
                return res.json([]);
            }

            // Filtrar productos por el ObjectId de la categoría
            productos = await Producto.find({ categoria: categoria._id }).populate('categoria', 'nombre');
        } else {
            // Si no se proporciona una categoría, obtener todos los productos
            productos = await Producto.find().populate('categoria', 'nombre');
        }
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

productoCtrl.createProd = async (req, res) => {
    const { nombre, precio, imagen, categoria, descripcion, ingredientes } = req.body;

    try {
        // Buscar la categoría por nombre para obtener su ID
        const categoriaEncontrada = await Categoria.findOne({ nombre: categoria });
        
        if (!categoriaEncontrada) {
            // Si la categoría no existe, devolver un error
            return res.status(400).json({ message: "La categoría especificada no existe" });
        }

        const newProd = new Producto({
            nombre,
            precio,
            imagen,
            categoria: categoriaEncontrada._id, // Utilizar el ID de la categoría encontrada
            descripcion: ['entrante', 'principal', 'postre'].includes(categoria) ? descripcion : '',
            ingredientes: ['entrante', 'principal', 'postre'].includes(categoria) ? ingredientes : []
        });

        await newProd.save();
        res.json({ message: "El producto ha sido creado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

productoCtrl.getProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id)
        res.status(200).json(producto)
    } catch (error) {
        res.status(404).json({ message: "Producto no encontrado" });
    }
}

productoCtrl.deleteProd = async (req, res) => {
    try {
        await Producto.findByIdAndDelete(req.params.id);
        res.json({ message: 'Producto ha sido eliminado' });
    } catch (error) {
        res.status(404).json({ message: "Producto no encontrado" });
    }
};

productoCtrl.updateProd = async (req, res) => {
    const { nombre, precio, imagen, categoria, descripcion, ingredientes } = req.body;

    try {
        await Producto.findByIdAndUpdate(req.params.id, {
            nombre,
            precio,
            imagen,
            categoria,
            descripcion: ['entrante', 'principal', 'postre'].includes(categoria) ? descripcion : '',
            ingredientes: ['entrante', 'principal', 'postre'].includes(categoria) ? ingredientes : []
        });
        res.json({ message: 'El producto ha sido actualizado' });
    } catch (error) {
        res.status(404).json({ message: "Producto no encontrado" });
    }
};

module.exports = productoCtrl;
