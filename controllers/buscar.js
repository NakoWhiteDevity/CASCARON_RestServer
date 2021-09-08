const { response } = require('express');
const cPermitidas = ['roles','productos','categorias','usuarios'];
const { ObjectId } = require('mongoose').Types;
const { Usuario,Categoria,Producto } = require('../models');

const buscarUsuarios = async(termino = '',res = response) => {

    const esMongoID = ObjectId.isValid(termino);
    if(esMongoID){
        const usuario = await Usuario.findById(termino);
        res.status(200).json({
            resultados : (usuario) ? [usuario] : []
        })
    }

}

const buscar = (req,res = response) => {
    
    const { coleccion , termino } = req.params;

    if( !cPermitidas.includes(coleccion) ){
        return res.status(400).json({msg:`Las colecciones permitidas son : ${cPermitidas}`});
    }

    switch(coleccion){
        case 'roles':
            
        break;
        case 'productos':
            
        break;
        case 'categorias':
            
        break;
        case 'usuarios':
            buscarUsuarios(termino,res);
        break;
        default:
            res.status(500).json({msg:'Se me fue de madre, mi rey.'});
        break;
    }

    //res.status(400).json({coleccion,termino});

}

module.exports = {
    buscar
}