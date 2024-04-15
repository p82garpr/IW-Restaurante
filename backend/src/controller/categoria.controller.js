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

categoriaCtrl.getCategoria = async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id)
        res.json(categoria)
    } catch (error) {
        res.status(404).json({ message: "Categoria no encontrada" });
    }
}


module.exports = categoriaCtrl
