const { response } = require('express');

const cargarArchivo = (req,res = response) => {
    res.json({msg:"ruta perfectamente implantada"})
}



module.exports = {
    cargarArchivo
}