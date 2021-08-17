//Si especificas el tipo de objeto que es, te saltas el tipado, por eso hay que añadir TS:
const { response , request } = require('express');
const Usuario = require('../models/usuario');
const bcjs = require('bcryptjs');

const usuariosGET = async(req = request,res = response ) => {
    
    //Atento, que todo lo que viene del query es string
    //limit : limite , skip : desde .
    //const usuarios = await Usuario.find().limit(5).skip(1);
    
    const query = { estado : true };
    /*
    const usuarios = await Usuario.find(query);
    const total = await Usuario.countDocuments(query);
    */

    const resp = await Promise.all([Usuario.countDocuments(query),Usuario.find(query)]);
    res.json(resp);
    
    /*
    const {a,b = 'vacio',c} = req.query;
    
    res.json({
        msg:'get API - controlador',
        a,b,c
    })
    */

}

const usuariosPUT = async(req,res = response ) => {
    
    const { id } = req.params;
    const { _id , password , google , correo , ...resto } = req.body;

    //Validar contra DB:
    if( password ){
        const salt = bcjs.genSaltSync(3);
        resto.password = bcjs.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);
    
    res.json({
        msg:'put API - controlador',
        id
    })
}

const usuariosPOST = async(req,res = response) => {
    
    const { nombre,correo,password,rol } = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});

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