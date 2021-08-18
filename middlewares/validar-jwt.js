const { response,request } = require('express');
const jwt = require('jsonwebtoken');
const usuario = require('../models/usuario');


const validarJWT = async(req = request,res = response,next ) => {
    const token = req.header('tokenNODE');
    if(!token){return res.status(401).json({msg:'Sin token en la petición'})};
    try {
        const { uid } = jwt.verify(token,process.env.SOPKEY);
        req.uid = uid;
        const autenticado = await usuario.findById(uid);
        req.autenticado = {autenticado,token};
        next();
    } catch(err) {
        console.log(err);
        res.status(401).json({msg:'Sin token en la petición'});
    }
}

module.exports = {
    validarJWT
}

