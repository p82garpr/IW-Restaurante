const Comanda = require('../models/Comanda');

const comandaCtrl = {};

comandaCtrl.getComandas = async (req, res) => {
    try {
        let comandas;
        if (req.params.estado) {
            // Filtrar comandas por estado
            comandas = await Comanda.find({ estado: req.params.estado });
        } else {
            // Si no se proporciona un estado, obtener todas las comandas
            comandas = await Comanda.find();
        }
        res.status(200).json(comandas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

comandaCtrl.createComanda = async (req, res) => {
    const { nombre_usuario, productos, hora, fecha, comentarios, precio_total, estado } = req.body;

    try {
        const nuevaComanda = new Comanda({
            nombre_usuario,
            productos,
            hora,
            fecha,
            comentarios,
            precio_total,
            estado: estado || "porServir" // Si no se proporciona un estado, por defecto se establece como "porServir"
        });
        await nuevaComanda.save();
        res.status(201).json({ message: 'Comanda creada correctamente', comanda: nuevaComanda });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

comandaCtrl.getComanda= async (req, res) => {
    try {
        const comanda = await Comanda.findById(req.params.id);
        if (!comanda) {
            return res.status(404).json({ message: 'Comanda no encontrada' });
        }
        res.status(200).json({ comanda });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

comandaCtrl.updateComanda = async (req, res) => {
    const { nombre_usuario, productos, hora, fecha, comentarios, precio_total, estado } = req.body;

    try {
        await Comanda.findByIdAndUpdate(req.params.id, {
            nombre_usuario,
            productos,
            hora,
            fecha,
            comentarios,
            precio_total,
            estado
        });
        res.status(200).json({ message: 'Comanda actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

comandaCtrl.deleteComanda = async (req, res) => {
    try {
        await Comanda.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Comanda eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = comandaCtrl;
