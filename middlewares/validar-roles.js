const { response } = require('express');

const esAdminRol = ( req , res = response , next ) => {
    if( !req.autenticado ){return res.status(500).json({msg:"Se quiere verificar el rol sin validar token"})};
    const { rol , nombre } = req.autenticado.autenticado;
    if(rol !== "ADMIN_ROLE"){return res.status(401).json({msg:`${nombre} no es administrador - No puede hacer esto.`})}
    next();
}

const tieneRol = ( ...roles ) => {
    return (req,res = response,next) => {
        if( !req.autenticado ){return res.status(500).json({msg:"Se quiere verificar el rol sin validar token"})};
        const { rol } = req.autenticado.autenticado;
        if (!roles.includes(rol)){ return res.status(401).json({msg:`No tienes un rol autorizado. Estos roles son ${roles}`}) }
        next();
    }
}

module.exports = {
    esAdminRol,
    tieneRol
}