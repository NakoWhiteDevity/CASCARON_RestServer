const { response } = require('express');
const { subirArchivo } = require('../helpers');

const cargarArchivo = async(req,res = response) => {
    
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).send({msg:'No hay archivos en la petición'});
        return;
    }

    try {
        //Si no deseas ocupar todos los argumentos de una funcion, puedes. EJ : subirArchivo(req.files,undefined,carpetatexto);
        const pathCompleto = await subirArchivo(req.files,undefined,'imagenes');
        res.json({path:pathCompleto});
    } catch(msg) {
        res.status(400).json({msg});
    }

}

const actualizarImagen = async(req,res = response) => {
    
    const { id , coleccion } = req.params;
    
    res.json({ id , coleccion });

};

module.exports = {
    cargarArchivo,
    actualizarImagen
}