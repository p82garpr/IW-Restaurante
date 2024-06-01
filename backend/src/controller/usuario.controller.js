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
    const { nombre_usuario, nombre, apellido, contraseña, fecha_nacimiento, cliente_info } = req.body;

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
            rol: "cliente",
            cliente_info: cliente_info
        });

        await newUsu.save();
        res.status(200).json({ message: "El usuario ha sido creado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

usuarioCtrl.deleteUsu = async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndDelete(req.params.id);
        if(!usuario){
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json({ message: 'El usuario ha sido eliminado' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

usuarioCtrl.updateUsu = async (req, res) => {
    const { nombre_usuario, nombre, apellido, contraseña, fecha_nacimiento, cliente_info } = req.body;

    try {
        let updateData = {
            nombre_usuario,
            nombre,
            apellido,
            fecha_nacimiento,
            cliente_info
        };


        // Solo actualizar la contraseña si se pasa en el cuerpo de la solicitud
        if (contraseña) {
            const contraseña_hashed = await bcrypt.hash(contraseña, saltRounds);
            updateData.contraseña = contraseña_hashed;
        }
        
        // Intentar encontrar y actualizar el usuario
        const usuario = await Usuario.findByIdAndUpdate(req.params.id, updateData, { new: true });
        
        // Si el usuario no se encuentra, devolver 404
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Devolver éxito si se actualizó el usuario
        res.status(200).json({ message: 'El usuario ha sido actualizado', usuario });
    } catch (error) {
        // Manejar cualquier otro error
        console.log(error);
        res.status(500).json({ message: "Error al actualizar el usuario", error });
        
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

        // Verificar el privilegio del usuario
        if (usuario.privilegio === 1 && mesa) { // Si el usuario es administrador y se proporciona un número de mesa
            return res.status(405).json({ message: 'Los administradores no pueden iniciar sesión con un número de mesa' });
        } else if (usuario.privilegio === 0) { // Si el usuario es cliente
            if (!mesa) {
                return res.status(403).json({ message: 'Se necesita proporcionar un número de mesa para iniciar sesión como cliente' });
            }

            const mesaAsociada = await Mesa.findOne({ _id: mesa });
            if (!mesaAsociada) {
                return res.status(404).json({ message: 'Mesa no encontrada' });
            }

            usuario.cliente_info.id_mesa = mesaAsociada._id;
            await usuario.save();

            mesaAsociada.estado = 'Ocupada';
            await mesaAsociada.save();
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

usuarioCtrl.getUsuarioActual = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
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

                mesa.estado = 'Libre';
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

module.exports = usuarioCtrl;
