const { response } = require('express');
const { Categoria } = require('../models');

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
    crearCategoria
}