const path = require('path');
const { response } = require('express');

const cargarArchivo = async(req,res = response) => {
    
    
    try{
        if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
            res.status(400).send({msg:'No hay archivos en la petición'});
            return;
        }
        const { archivo } = req.files;
        const uploadPath = path.join(__dirname, '../uploads/', archivo.name);
        archivo.mv(uploadPath, (err) => {
            if (err) {
                return res.status(500).json({err});
            }
            res.json({msg:`El archivo se subio a ${uploadPath}`});
        });
    }catch(err){res.status(400).json({err})}
    
}



module.exports = {
    cargarArchivo
}