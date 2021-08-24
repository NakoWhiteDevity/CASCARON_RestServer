const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { gJWT } = require('../helpers/gJWT');
const { googleV } = require('../helpers/googleVerify');
const usuario = require('../models/usuario');


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
        const { correo , nombre , img } = await googleV(id_token);
        let comprobar = await Usuario.findOne({correo});
        let usuario = undefined;
        if(comprobar == null){
            const data = {nombre,correo,img,google:true};
            const nuevo = new Usuario(data);
            await nuevo.save();
            usuario = nuevo;
            usuario.id = usuario._id
        } else {
            usuario = comprobar ; usuario.id = comprobar._id ;
        }
        

        //generar el JWT:
        const token = await gJWT(usuario.id);


        res.json({
            msg:'todo OK - googleSI',
            token
        });
        
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