const { response } = require('express');
const cPermitidas = ['roles','productos','categorias','usuarios'];
const { ObjectId } = require('mongoose').Types;
const { Usuario,Categoria,Producto } = require('../models');

const buscarUsuarios = async(termino = '',res = response) => {

    const esMongoID = ObjectId.isValid(termino);
    
    if(esMongoID){
        const usuario = await Usuario.findById(termino);
        return res.status(200).json({
            resultados : (usuario) ? [usuario] : []
        })
    }

    const regex = new RegExp( termino, 'i' );
    
    const usuarios = await Usuario.find({
        $or:[{nombre:regex},{correo:regex}],
        $and:[{estado:true}]
    });
    
    res.status(200).json({
        resultados : usuarios
    })

}

const buscarCategorias = async(termino = '',res = response) => {

    const esMongoID = ObjectId.isValid(termino);

    if(esMongoID){
        const categoria = await Categoria.findById(termino);
        return res.status(200).json({
            resultados : (categoria) ? [categoria] : []
        })
    };

    const regex = new RegExp( termino , 'i' );

    const categorias = await Categoria.find({nombre:regex,estado:true});
    res.status(200).json({resultados:categorias});

}

const buscarProductos = async(termino = '',res = response) => {

    const esMongoID = ObjectId.isValid(termino);

    if(esMongoID){
        const producto = await Producto.findById(termino).populate('categoria','nombre');
        return res.status(200).json({
            resultados : (producto) ? [producto] : []
        })
    };

    const regex = new RegExp( termino , 'i' );

    const productos = await Producto.find({nombre:regex,estado:true}).populate('categoria','nombre');
    res.status(200).json({resultados:productos});

}

const buscar = (req,res = response) => {
    
    const { coleccion , termino } = req.params;

    if( !cPermitidas.includes(coleccion) ){
        return res.status(400).json({msg:`Las colecciones permitidas son : ${cPermitidas}`});
    }

    switch(coleccion){
        //.populate('categoria','nombre')case 'roles': break;
        case 'productos':
            buscarProductos(termino,res);
        break;
        case 'categorias':
            buscarCategorias(termino,res);
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