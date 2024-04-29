const usuarioCtrl = {}

const Usuario = require('../models/Usuario')

const bcrypt = require('bcrypt');
const saltRounds = 10; // Número de rondas de sal para el hashing


usuarioCtrl.getUsu = async (req, res) => {
    try {
        const usuarios = await Usuario.find()
        res.status(200).json(usuarios)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

usuarioCtrl.createUsu = async (req, res) => {
    const { nombre_usuario, nombre, apellido, contraseña, fecha_nacimiento, privilegio, rol, cliente_info } = req.body;

    try {

        // Verificar si ya existe un usuario con el mismo nombre de usuario
        const usuarioExistente = await Usuario.findOne({ nombre_usuario });

        if (usuarioExistente) {
            return res.status(400).json({ message: "El nombre de usuario ya está en uso" });
        }


        const contraseña_hashed = await bcrypt.hash(contraseña, saltRounds);

        const newUsu = new Usuario({
            nombre_usuario,
            nombre,
            apellido,
            contraseña: contraseña_hashed,
            fecha_nacimiento,
            privilegio,
            rol,
            cliente_info: rol === 'cliente' ? cliente_info : {} // Asegurando que el cliente_info esté vacío si el rol no es 'cliente'
        });

        await newUsu.save();
        res.status(200).json({ message: "El usuario ha sido creado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

usuarioCtrl.getUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id)
        res.status(200).json(usuario)
    } catch (error) {
        res.status(404).json({ message: "Usuario no encontrado" });
    }
}

usuarioCtrl.deleteUsu = async (req, res) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'El usuario ha sido eliminado' })
    } catch (error) {
        res.status(404).json({ message: "Usuario no encontrado" });
    }
}

usuarioCtrl.updateUsu = async (req, res) => {
    const { nombre_usuario, nombre, apellido, contraseña, fecha_nacimiento, privilegio, rol, cliente_info } = req.body;

    try {
        const contraseña_hashed = await bcrypt.hash(contraseña, saltRounds);
        await Usuario.findByIdAndUpdate(req.params.id, {
            nombre_usuario,
            nombre,
            apellido,
            contraseña:contraseña_hashed,
            fecha_nacimiento,
            privilegio,
            rol,
            cliente_info: rol === 'cliente' ? cliente_info : {} // Asegurando que el cliente_info esté vacío si el rol no es 'cliente'
        })
        res.status(200).json({ message: 'El usuario ha sido actualizado' })
    } catch (error) {
        res.status(404).json({ message: "Usuario no encontrado" });
    }
}

module.exports = usuarioCtrl
