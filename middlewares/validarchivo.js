const { response } = require('express');

const validArchivo = async(req,res = response,next) => {
    
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).send({msg:'No hay archivos en la petición - validArchivo'});
    }

    next();

}

module.exports = {
    validArchivo
}