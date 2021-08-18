const { response } = require('express');

const esAdminRol = ( req , res = response , next ) => {
    if( !req.usuario ){return res.status(500).json({msg:"Se quiere verificar el rol sin validar token"})};
    const { rol , nombre } = req.usuario;
    if(rol !== "ADMIN_ROLE"){return res.status(401).json({msg:`${nombre} no es administrador - No puede hacer esto.`})}
    next()
}

module.exports = {
    esAdminRol
}