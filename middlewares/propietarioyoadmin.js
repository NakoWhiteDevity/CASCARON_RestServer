const { response } = require('express');
const producto = require('../models/producto');

const propietarioyoadmin = async(req,res = response, next) => {

    const devuelveX = (boleano) => {if(boleano){return "X"} else {return ""}};
    let flag = { fuser:false , fprod:false };
    
    try {
        
        const productoid = req.params.id;
        const { _id:idusuario , rol:rolusuario } = req.autenticado.autenticado;
        let ids = { idusuario , rolusuario };

        //comprobamos si es admin:
        if( rolusuario !== 'ADMIN_ROLE' ){ flag.fuser = true };

        //comprobamos si es propietario:
        const busquedaproducto = await producto.findById(productoid).populate('usuario');
        if( busquedaproducto.usuario._id !== idusuario ){ flag.fprod = true };

        if( !flag.fuser && !flag.fprod ){next()} else {return res.status(401).json({msg:'El usuario no es ni administrador ni propietario del recurso'})}

        //`[${devuelveX(flag.fuser)}] ADMINISTRADOR | [${devuelveX(flag.fprod)}] PROPIETARIO`
    
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