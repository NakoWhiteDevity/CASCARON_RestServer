const { response } = require('express');
const { Categoria } = require('../models');

//obtenerCategorias - paginado - total - populate de moongose.
//obtenerCategoria - populate ()
//actualizarCategoria.
//borrarCategoria

const obtenerCat = async(req,res = response) => {
    
    //Puedes ver la sugerencia de paginado y filtro de activo en el controlador de usuarios - usuariosGET.
    
    try {
        //const busqueda = await Categoria.find().populate('usuario');
        const busqueda = await Categoria.find().populate('usuario','nombre');
        res.status(200).json(busqueda);
    } catch (err) {
        res.status(400).json({
            msg : "Error en obtener categorias",
        });
    }

}

const obtenerCatSingular = async(req,res = response) => {

    try {
        const { id } = req.params;
        //const busqueda = await Categoria.findById( id ).populate('usuario');
        const busqueda = await Categoria.findById( id ).populate('usuario','nombre');
        res.status(200).json(busqueda);
    } catch (err) {
        res.status(400).json({
            msg : "Error al obtener la categoria",
        })
    }

}

//La opción en FindByIdAndUpdate de {new:true} devuelve el nuevo registro con la modificación realizada
const actualizarCatSingular = async(req,res = response) => {

    try {
        const { id } = req.params;
        let { nombre } = req.body; nombre = nombre.toUpperCase();
        const uid = req.autenticado.autenticado._id;
        const categoria = await Categoria.findByIdAndUpdate(id,{nombre,usuario:uid},{new : true});
        res.status(200).json(categoria);
    } catch (err) {
        res.status(400).json({
            msg : "Error al actualizar la categoria",
            err
        })
    }

}

const borrarCatSingular = async(req,res = response) => {
    
    try {
        const { id } = req.params;
        const cambio = await Categoria.findByIdAndUpdate(id,{estado:false},{new:true});
        res.status(200).json(cambio);
    } catch (err) {
        res.status(400).json({
            msg : "Error al borrar la categoria",
            err
        });
    }

}

const crearCategoria = async(req,res = response) => {
    
    try{
        const nombre = req.body.nombre.toUpperCase();
        const usuario = req.autenticado.autenticado;
        let comprobar = await Categoria.findOne({nombre});
        if(comprobar !== null){
            return res.status(400).json({msg:`${nombre} ya existe`})
        }
        //generar datos a guardar:
        const data = { nombre , usuario:usuario._id }
        //grabar los datos:
        const categoria = new Categoria(data);
        //guardar en DB:
        await categoria.save()

        res.status(201).json(categoria);
    } catch (err) {
        res.status(400).json({
            err
        })
    }
    
}

module.exports = {
    crearCategoria,
    obtenerCat,
    obtenerCatSingular,
    actualizarCatSingular,
    borrarCatSingular
}