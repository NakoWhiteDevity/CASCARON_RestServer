const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { gJWT } = require('../helpers/gJWT');
const { googleV } = require('../helpers/googleVerify');


const login = async(req , res = response) => {

    const { correo , password } = req.body;

    try {
        //Verificar si el email existe:
        const usuario = await Usuario.findOne({correo});
        if(!usuario){return res.status(400).json({msg:'Usuario/contraseña no son correctos - correo'})};
        //Si el usuario está activo:
        if(!usuario.estado){return res.status(400).json({msg:'Usuario/contraseña no son correctos - estado'})};
        //Verificar la contraseña:
        const valida = bcryptjs.compareSync(password,usuario.password);
        if(!valida){return res.status(400).json({msg:'Usuario/contraseña no son correctos - contraseña'})};
        //Generar el JWT.
        const token = await gJWT(usuario.id);
        res.json({usuario,token})
    } catch (err) {
        console.log(err);
        return res.status(500).json({msg:'Hable con el administrador.'});
    }

}

const googleSI = async(req,res = response) => {
    try {
        const {id_token} = req.body;
        const googleU = await googleV(id_token);
        res.json({
            msg:'todo OK - googleSI',
            googleU
        })
    } catch (err) {
        res.status(400).json({
            msg:'token de google no válido'
        })
    }
}

module.exports = {
    login,
    googleSI
}