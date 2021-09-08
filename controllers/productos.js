// [X]Obtener todos los productos.
// [X]Obtener producto por id(param),
// [X]Crear producto - PRIVADO : Requiere token.
// [/]Actualizar producto - PRIVADO : Requiere token. Solo para administradores y propietarios del recurso.
// [X]Borrar un producto - PRIVADO : Requiere token . Solo para administradores y propietarios del recurso.

// FIJATE MUCHO EN LA PRACTICA DE CATEGORIAS! :

const { response } = require('express');
const { Producto } = require('../models');

const obtenerProductoSingular = async(req,res = response) => {
    
    try {
        const { id } = req.params;
        const busqueda = await Producto.findById(id).populate('usuario','nombre').populate('categoria','nombre');
        res.status(200).json(busqueda);
    } catch(err) { res.status(400).json({msg:"Error al obtener los productos"}) };

}

const obtenerPRODUCTOS = async(req,res = response) => {

    try {
        const busqueda = await Producto.find().populate('usuario','nombre').populate('categoria','nombre');
        res.status(200).json(busqueda);
    } catch(err) { res.status(400).json({msg:"Error al obtener los productos"}) };

}

const crearPRODUCTO = async(req,res = response) => {
    
    try {
        const data = {
            nombre : req.body.nombre,
            usuario : req.autenticado.autenticado._id,
            categoria : req.params.id,
            descripcion : "Descripción de pruebas para el desarrollo de la app."
        }
        const producto = new Producto(data);
        await producto.save();
        res.status(201).json(producto);
    } catch (err) { res.status(400).json({err}) }
    
    /*
    Esto logra darme la respuesta que necesito
    
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
    */

}

const modificarPRODUCTO = async(req,res = response) => {

    try {

    } catch(err){ res.status(400).json({err}) };

}

const borrarPRODUCTO = async(req,res = response) => {

    try {
        const { id } = req.params;
        const cambio = await Producto.findByIdAndUpdate(id,{disponible:false},{new:true});
        res.status(200).json(cambio);
    } catch(err) { res.status(400).json({err}) };

}

module.exports = {
    crearPRODUCTO,
    obtenerPRODUCTOS,
    obtenerProductoSingular,
    borrarPRODUCTO,
    modificarPRODUCTO
}

