const cestaCtrl = {}

const Cesta = require('../models/Cesta')
const Usuario = require('../models/Usuario')


cestaCtrl.createCesta = async (req, res) => {
    const { usuario } = req.body;

    try {
        // Verificar si el usuario existe y es un cliente (rol === 'cliente')
        const usuarioEncontrado = await Usuario.findById(usuario);
        
        if (!usuarioEncontrado) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        if (usuarioEncontrado.rol !== 'cliente') {
            return res.status(403).json({ message: "Acceso denegado. Solo los clientes pueden crear una cesta." });
        }

        // Verificar si el usuario ya tiene una cesta
        const existingCesta = await Cesta.findOne({ usuario });

        if (existingCesta) {
            return res.status(400).json({ message: "El usuario ya tiene una cesta activa." });
        }

        // Si el usuario es un cliente y no tiene una cesta, crear una nueva
        const newCesta = new Cesta({ usuario });
        await newCesta.save();
        return res.json({ message: "La cesta ha sido creada" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


cestaCtrl.getCesta = async (req, res) => {
    try {
        const cesta = await Cesta.findById(req.params.id)
        res.json(cesta)
    } catch (error) {
        res.status(404).json({ message: "Cesta no encontrada" });
    }
}


cestaCtrl.updateCesta = async (req, res) => {
    const { usuario, productos, precio_total} = req.body;

    try {
        await cesta.findByIdAndUpdate(req.params.id, {
            usuario,
            productos,
            precio_total,
           
        })
        res.json({ message: 'La cesta ha sido actualizado' })
    } catch (error) {
        res.status(404).json({ message: "Cesta no encontrada" });
    }
}

module.exports = cestaCtrl
