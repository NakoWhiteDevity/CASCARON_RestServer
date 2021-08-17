const { response,request } = require('express');
const jwt = require('jsonwebtoken');


const validarJWT = (req = request,res = response,next ) => {
    const token = req.header('tokenNODE');
    if(!token){return res.status(401).json({msg:'Sin token en la petición'})};
    try {
        const { uid } = jwt.verify(token,process.env.SOPKEY);
        req.uid = uid;
        next();
    } catch(err) {
        console.log(err);
        res.status(401).json({msg:'Sin token en la petición'});
    }
}

module.exports = {
    validarJWT
}

