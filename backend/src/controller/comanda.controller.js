const Comanda = require('../models/Comanda');
const Usuario = require('../models/Usuario');

const comandaCtrl = {};

comandaCtrl.getComandas = async (req, res) => {
    try {
        if (req.session && req.session.usuarioId) {
            const usuario = await Usuario.findById(req.session.usuarioId);
            if (!usuario || usuario.privilegio != 1) {
                return res.status(403).json({ message: 'Forbidden: Insufficient privilege' });
            }
        } else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
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
    const { id_usuario, productos, hora, fecha, comentarios, precio_total,mesa, estado } = req.body;

    try {
        if (req.session && req.session.usuarioId) {
            const usuario = await Usuario.findById(req.session.usuarioId);
            
        } else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const nuevaComanda = new Comanda({
            id_usuario,
            productos,
            hora,
            fecha,
            mesa,
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
        if (req.session && req.session.usuarioId) {
            const usuario = await Usuario.findById(req.session.usuarioId);
            
        } else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
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
    const { id_usuario, productos, hora, fecha, comentarios, precio_total, estado, mesa } = req.body;

    try {
        if (req.session && req.session.usuarioId) {
            const usuario = await Usuario.findById(req.session.usuarioId);
           
        } else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        await Comanda.findByIdAndUpdate(req.params.id, {
            id_usuario,
            productos,
            hora,
            fecha,
            comentarios,
            precio_total,
            mesa,
            estado
        });
        res.status(200).json({ message: 'Comanda actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

comandaCtrl.deleteComanda = async (req, res) => {
    try {
        if (req.session && req.session.usuarioId) {
            const usuario = await Usuario.findById(req.session.usuarioId);
            if (!usuario || usuario.privilegio != 1) {
                return res.status(403).json({ message: 'Forbidden: Insufficient privilege' });
            }
        } else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        await Comanda.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Comanda eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = comandaCtrl;
