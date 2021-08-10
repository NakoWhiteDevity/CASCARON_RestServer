//Si especificas el tipo de objeto que es, te saltas el tipado, por eso hay que añadir TS:
const { response , request } = require('express');
const Usuario = require('../models/usuario');

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
    const body = req.body;
    const usuario = new Usuario(body);
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