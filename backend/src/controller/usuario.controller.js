const usuarioCtrl = {}

const Usuario = require('../models/Usuario')

usuarioCtrl.getUsu = async(req,res)=>{
    const usuarios = await Usuario.find()
    res.json(usuarios)
}

usuarioCtrl.createUsu = async(req,res)=>{
    const {nombre_usuario, nombre, apellido, contraseña, fecha_nacimiento, privilegio} = req.body;
    const newUsu = new Usuario({
        nombre_usuario: nombre_usuario,
        nombre: nombre,
        apellido: apellido,
        contraseña: contraseña,
        fecha_nacimiento: fecha_nacimiento,
        privilegio: privilegio,
        id_mesa: null
    })

    await newUsu.save();
    res.json({message: "el usuario ha sido creado"})
}

//Buscar
usuarioCtrl.getUsuario = async(req,res)=>{
    const usuario = await Usuario.findById(req.params.id)
    res.json(usuario)
    
}

usuarioCtrl.deleteUsu = async(req,res)=>{
    await Usuario.findByIdAndDelete(req.params.id)
    res.json({message: 'usuario ha sido eliminado'})
}

usuarioCtrl.updateUsu = async(req,res)=>{
    const {nombre_usuario, nombre, apellido, contraseña, fecha_nacimiento, privilegio, id_mesa} = req.body;
    await Usuario.findByIdAndUpdate(req.params.id, {
        nombre_usuario,
        nombre,
        apellido,
        contraseña,
        fecha_nacimiento,
        privilegio,
        id_mesa
    })
    res.json({message: 'el usuario ha sido actualizado'})
}

module.exports = usuarioCtrl