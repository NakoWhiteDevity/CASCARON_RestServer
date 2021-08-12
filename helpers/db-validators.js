const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolvalido = async(rol = "") => {
    const eROL = await Role.findOne({rol});
    if(!eROL){ throw new Error(`${rol} no esta permitido`) }
}

const emailExiste = async(correo = "") => {
    const eMAIL = await Usuario.findOne({correo});
    console.log(eMAIL);
    if(eMAIL){ throw new Error(`El correo ya esta en uso`) };
}

const existeUser = async(id) => {
    const eID = await Usuario.findById(id);
    if(!eID){ throw new Error('El usuario no existe') }
}

/*
//Verificar si existe el correo.
    const existeEmail = await Usuario.findOne({ correo });
    if(existeEmail){ return res.status(400).json({msg:'El correo ya esta registrado'}) }
*/

module.exports = {
    esRolvalido,
    emailExiste,
    existeUser
}