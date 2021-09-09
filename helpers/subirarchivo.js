const { v4: uuidv4 } = require('uuid');
const path = require('path');

const subirArchivo = async(ficheros , eValidas = ['png','jpg','jpeg','gif'], carpeta = '') => {
    return new Promise( (rs,rj) => {
        const { archivo } = ficheros;
        const extension = archivo.name.split('.')[archivo.name.split('.').length - 1];
        const nTEMP = `${uuidv4()}.${extension}`;
        const uploadPath = path.join(__dirname, '../uploads/', nTEMP);
        //validar la extensión:
        if(!eValidas.includes(extension)){ return rj(`La extensión ${extension} no esta permitida`) };
        archivo.mv(uploadPath,(err) => {
            if(err){rj(err)};
            rs(nTEMP);
        });
    });
};

module.exports = { subirArchivo }