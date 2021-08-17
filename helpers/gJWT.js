const jwt = require('jsonwebtoken');

const gJWT = ( uid = '' ) => {
    return new Promise( (res , rej) => {
        const payload = { uid };
        jwt.sign(payload,process.env.SOPKEY ,{
            expiresIn: '4h'
        },(err,token) => {
            if(err){console.log(err),rej('no se pudo generar el token')} else { res(token) }
        })
    })
}

module.exports = { gJWT }