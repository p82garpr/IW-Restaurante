const usuarioCtrl = {}

const Usuario = require('../models/Usuario')

usuarioCtrl.getUsu = async (req, res) => {
    try {
        const usuarios = await Usuario.find()
        res.json(usuarios)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

usuarioCtrl.createUsu = async (req, res) => {
    const { nombre_usuario, nombre, apellido, contraseña, fecha_nacimiento, privilegio, rol, cliente_info } = req.body;

    try {
        const newUsu = new Usuario({
            nombre_usuario,
            nombre,
            apellido,
            contraseña,
            fecha_nacimiento,
            privilegio,
            rol,
            cliente_info: rol === 'cliente' ? cliente_info : {} // Asegurando que el cliente_info esté vacío si el rol no es 'cliente'
        });

        await newUsu.save();
        res.json({ message: "El usuario ha sido creado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

usuarioCtrl.getUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id)
        res.json(usuario)
    } catch (error) {
        res.status(404).json({ message: "Usuario no encontrado" });
    }
}

usuarioCtrl.deleteUsu = async (req, res) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id)
        res.json({ message: 'Usuario ha sido eliminado' })
    } catch (error) {
        res.status(404).json({ message: "Usuario no encontrado" });
    }
}

usuarioCtrl.updateUsu = async (req, res) => {
    const { nombre_usuario, nombre, apellido, contraseña, fecha_nacimiento, privilegio, rol, cliente_info } = req.body;

    try {
        await Usuario.findByIdAndUpdate(req.params.id, {
            nombre_usuario,
            nombre,
            apellido,
            contraseña,
            fecha_nacimiento,
            privilegio,
            rol,
            cliente_info: rol === 'cliente' ? cliente_info : {} // Asegurando que el cliente_info esté vacío si el rol no es 'cliente'
        })
        res.json({ message: 'El usuario ha sido actualizado' })
    } catch (error) {
        res.status(404).json({ message: "Usuario no encontrado" });
    }
}

module.exports = usuarioCtrl
