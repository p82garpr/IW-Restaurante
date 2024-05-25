const usuarioCtrl = {};
const Usuario = require('../models/Usuario');
const Mesa = require('../models/Mesa');
const bcrypt = require('bcrypt');
const saltRounds = 10;

usuarioCtrl.getUsu = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

usuarioCtrl.createUsu = async (req, res) => {
    const { nombre_usuario, nombre, apellido, contraseña, fecha_nacimiento, privilegio, rol, cliente_info } = req.body;

    try {
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
            privilegio: 0,
            rol,
            cliente_info: rol === 'cliente' ? cliente_info : {}
        });

        await newUsu.save();
        res.status(200).json({ message: "El usuario ha sido creado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

usuarioCtrl.deleteUsu = async (req, res) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'El usuario ha sido eliminado' });
    } catch (error) {
        res.status(404).json({ message: "Usuario no encontrado" });
    }
};

usuarioCtrl.updateUsu = async (req, res) => {
    const { nombre_usuario, nombre, apellido, contraseña, fecha_nacimiento, privilegio, rol, cliente_info } = req.body;
    
    try {
        const contraseña_hashed= "null"
        if(contraseña){
            contraseña_hashed = await bcrypt.hash(contraseña, saltRounds);
        }
        await Usuario.findByIdAndUpdate(req.params.id, {
            nombre_usuario,
            nombre,
            apellido,
            contraseña: contraseña_hashed,
            fecha_nacimiento,
            privilegio,
            rol,
            cliente_info: rol === 'cliente' ? cliente_info : {}
        });
        res.status(200).json({ message: 'El usuario ha sido actualizado' });
    } catch (error) {
        res.status(404).json({ message: "Usuario no encontrado" });
    }
};

usuarioCtrl.loginUsu = async (req, res) => {
    const { nombre_usuario, contraseña, mesa } = req.body;
    

    try {
        const usuario = await Usuario.findOne({ nombre_usuario });
        if (!usuario) {
            return res.status(401).json({ message: 'Usuario incorrecto' });
        }

        const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!contraseñaValida) {
            return res.status(402).json({ message: 'Credenciales incorrectas' });
        }

        req.session.usuarioId = usuario._id.toString();
        const mesaAsociada = await Mesa.findOne({ _id: mesa });
        
        if (!mesaAsociada) {
            return res.status(404).json({ message: 'Mesa no encontrada' });
        }
       
        usuario.cliente_info.id_mesa = mesaAsociada._id;
        await usuario.save();

        mesaAsociada.estado = 'ocupada';
        await mesaAsociada.save();

        res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

usuarioCtrl.getUsuarioActual = async (req, res) => {
    try {
        if (!req.session) {
            return res.status(401).json({ message: 'Sesión no inicializada' });
        }
        if (!req.session.usuarioId) {
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }
        
        const usuario = await Usuario.findById(req.session.usuarioId, { contraseña: 0 });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

usuarioCtrl.logoutUsu = async (req, res) => {
    try {
        const usuarioId = req.session.usuarioId; // Almacena el ID del usuario antes de destruir la sesión

        req.session.destroy(async (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error al cerrar sesión' });
            }

            const usuario = await Usuario.findById(usuarioId); // Utiliza el ID almacenado
            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            if (usuario.cliente_info && usuario.cliente_info.id_mesa) {
                const mesa = await Mesa.findById(usuario.cliente_info.id_mesa);
                if (!mesa) {
                    return res.status(404).json({ message: 'Mesa no encontrada' });
                }

                mesa.estado = 'libre';
                await mesa.save();

                // Actualiza el usuario para eliminar la referencia a la mesa
                usuario.cliente_info.id_mesa = null;
                await usuario.save();
            }

            res.clearCookie('connect.sid');
            res.status(200).json({ message: 'Sesión cerrada exitosamente' });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




module.exports = usuarioCtrl