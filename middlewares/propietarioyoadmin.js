const { response } = require('express');
const producto = require('../models/producto');

const propietarioyoadmin = async(req,res = response, next) => {

    const devuelveX = (boleano) => {if(boleano){return "X"} else {return ""}};
    let flag = { esadmin:false , espropietario:false };
    
    try {
        
        const productoid = req.params.id;
        const { _id:idusuario , rol:rolusuario } = req.autenticado.autenticado;
        let ids = { idusuario , rolusuario };

        //comprobamos si es admin:
        if( rolusuario == 'ADMIN_ROLE' ){ flag.esadmin = true };

        //comprobamos si es propietario:
        const busquedaproducto = await producto.findById(productoid).populate('usuario');
        if( busquedaproducto.usuario._id == idusuario ){ flag.espropietario = true };

        if(flag.esadmin){next()}else{
            if(flag.espropietario){next()}else{
                res.status(401).json({msg:'No eres administrador ni propietario del recurso'})
            }
        }
    
    } catch(err){res.status(400).json({err})};
    
    /*
    Con esto tienes una salida de prueba deseable:
    try {
        let flag = 0;
        const productoid = req.params.id;
        const { _id:pepe , rol } = req.autenticado.autenticado;
        console.log(pepe,rol);
        next()
    } 
    */

}

module.exports = {
    propietarioyoadmin
}