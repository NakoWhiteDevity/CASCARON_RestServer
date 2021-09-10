const path = require('path');
const fs = require('fs');
const { response } = require('express');
const { subirArchivo } = require('../helpers');
const { Usuario , Producto } = require('../models');

const cargarArchivo = async(req,res = response) => {

    try {
        //Si no deseas ocupar todos los argumentos de una funcion, puedes. EJ : subirArchivo(req.files,undefined,carpetatexto);
        const pathCompleto = await subirArchivo(req.files,undefined,'imagenes');
        res.json({path:pathCompleto});
    } catch(msg) {
        res.status(400).json({msg});
    }

}

const actualizarImagen = async(req,res = response) => {
    
    const fbijsonerror = (coleccion) => {return res.status(400).json({msg:`No existe un ${coleccion} con el id introducido`});}
    
    const { id , coleccion } = req.params;

    let modelo;

    switch(coleccion){
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){return fbijsonerror(coleccion)};
        break;
        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){return fbijsonerror(coleccion)};
        break;

        default:
            return res.status(500).json({msg:'se me olvido validar esto'});
    }

    //comprobar si tenemos la imagen
    if(modelo.img){
        //Hay que borrar la imagen del servidor:
        const pathimg = path.join( __dirname,'../uploads',`./${coleccion}`,modelo.img);
        if(fs.existsSync(pathimg)){
            fs.unlinkSync(pathimg);
        }
    }
    
    modelo.img = await subirArchivo(req.files,undefined,coleccion);
    await modelo.save();
    
    res.json(modelo);

};

const mostrarImagen = async(req,res = response) => {
    
    const fbijsonerror = (coleccion) => {return res.status(400).json({msg:`No existe un ${coleccion} con el id introducido`});}
    
    const { id , coleccion } = req.params;

    let modelo;

    switch(coleccion){
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){return fbijsonerror(coleccion)};
        break;
        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){return fbijsonerror(coleccion)};
        break;

        default:
            return res.status(500).json({msg:'se me olvido validar esto'});
    }

    if(modelo.img){
        const pathimg = path.join( __dirname,'../uploads',`./${coleccion}`,modelo.img);
        if(fs.existsSync(pathimg)){return res.sendFile(pathimg)};
    } else {
        return res.sendFile(path.join(__dirname,'../uploads','./imgsprueba','relleno.jpg'));
    }

}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
}