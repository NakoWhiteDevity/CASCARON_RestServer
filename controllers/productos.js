// Obtener todos los productos.
// Obtener producto por id(param),
// Crear producto - PRIVADO : Requiere token.
// Actualizar producto - PRIVADO : Requiere token.
// Borrar una categoria - PRIVADO : Requiere token . ADMIN : Solo por administradores.

// FIJATE MUCHO EN LA PRACTICA DE CATEGORIAS! :

const { response } = require('express');
const { Categoria } = require('../models');

const crearPRODUCTO = async(req,res = response) => {
    
    try {
        const nombre = req.body.nombre;
        const usuario = req.autenticado.autenticado;
        const catid = req.params.id;
        const categoria = await Categoria.findById( catid ).populate('usuario');
        let test = { nombre , usuario , catid , categoria };
        res.status(200).json(test);
    } catch (err) {
        res.status(400).json({err});
    }

}

module.exports = {
    crearPRODUCTO,
}

