const Categoria = require('../models/categoria');
const Role = require('../models/role');
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');

const esRolvalido = async(rol = "") => {
    const eROL = await Role.findOne({rol});
    if(!eROL){ throw new Error(`${rol} no esta permitido`) }
}

const emailExiste = async(correo = "") => {
    const eMAIL = await Usuario.findOne({correo});
    if(eMAIL){ throw new Error(`El correo ya esta en uso`) };
}

const existeUser = async(id) => {
    const eID = await Usuario.findById(id);
    if(!eID){ throw new Error('El usuario no existe') }
}

const existeCategoria = async(id) => {
    const eCAT = await Categoria.findById(id);
    if(!eCAT){ throw new Error('La categoria no existe') }
}

const existeProducto = async(id) => {
    const ePRO = await Producto.findById(id);
    if(!ePRO){ throw new Error('el producto no existe') }
}

const coleccionesPermitidas = async(coleccion = '',colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if(!incluida){throw new Error(`La coleccion ${ coleccion } no esta permitida`)}
}

/*
//Verificar si existe el correo.
    const existeEmail = await Usuario.findOne({ correo });
    if(existeEmail){ return res.status(400).json({msg:'El correo ya esta registrado'}) }
*/

module.exports = {
    esRolvalido,
    emailExiste,
    existeUser,
    existeCategoria,
    existeProducto,
    coleccionesPermitidas
}