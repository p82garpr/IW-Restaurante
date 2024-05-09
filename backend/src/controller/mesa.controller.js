const mesaCtrl = {}
const QRCode = require('qrcode');
const Mesa = require('../models/Mesa')


mesaCtrl.getMesas = async (req, res) => {
    try {
        const mesas = await Mesa.find()
        res.status(200).json(mesas)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

mesaCtrl.getMesa = async (req, res) => {
    try {
        const mesa = await Mesa.findById(req.params.id)
        res.status(200).json(mesa)
    } catch (error) {
        res.status(404).json({ message: "Mesa no encontrada" });
    }
};

mesaCtrl.createMesa = async (req, res) => {
    const { numero_mesa, estado, capacidad } = req.body;

    try {

        // Generar el código QR utilizando el número de mesa
        const qrData = `http://localhost:4000/?mesa=${numeroMesa}`;
        const qrCode = await QRCode.toDataURL(qrData);
  
        const newMesa = new Mesa({
            numero_mesa,
            estado,
            capacidad,
            qr: qrCode // Almacena el código QR en la base de datos
    
        });

        await newMesa.save();
        res.status(200).json({ message: "La mesa ha sido creada" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

mesaCtrl.deleteMesa = async (req, res) => {
    try {
        await Mesa.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'La mesa ha sido eliminada' })
    } catch (error) {
        res.status(404).json({ message: "Mesa no encontrada" });
    }
}

mesaCtrl.updateMesa = async (req, res) => {
    const {numero_mesa, estado, capacidad } = req.body;

    try {
        await Mesa.findByIdAndUpdate(req.params.id, {
            numero_mesa,
            estado,
            capacidad

        })
        res.status(200).json({ message: 'La mesa ha sido actualizada' })
    } catch (error) {
        res.status(404).json({ message: "Mesa no encontrada" });
    }
}




module.exports = mesaCtrl