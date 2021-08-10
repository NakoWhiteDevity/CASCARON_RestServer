//Si especificas el tipo de objeto que es, te saltas el tipado, por eso hay que añadir TS:
const { response , request } = require('express');
const Usuario = require('../models/usuario');
const bcjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const usuariosGET = (req = request,res = response ) => {
    
    const {a,b = 'vacio',c} = req.query;
    
    res.json({
        msg:'get API - controlador',
        a,b,c
    })
}

const usuariosPUT = (req,res = response ) => {
    
    const { id } = req.params;
    
    res.json({
        msg:'put API - controlador',
        id
    })
}

const usuariosPOST = async(req,res = response) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){return res.status(400).json(errors)}
    
    const { nombre,correo,password,rol } = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});

    //Verificar si existe el correo.
    const existeEmail = await Usuario.findOne({ correo });
    if(existeEmail){ return res.status(400).json({msg:'El correo ya esta registrado'}) }


    //Encriptar la contraseña:
    const salt = bcjs.genSaltSync(3);
    usuario.password = bcjs.hashSync(password,salt);

    //guardar en BD.
    await usuario.save();
    
    res.json({
        msg:'post API - controlador',
        usuario
    });
}

const usuariosDELETE = (req,res = response) => {
    res.json({
        msg:'delete API - controlador'
    });
}

module.exports = {
    usuariosGET,
    usuariosPOST,
    usuariosDELETE,
    usuariosPUT
}