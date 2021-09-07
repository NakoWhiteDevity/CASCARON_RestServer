const { response } = require('express');
const { categoria } = require('../models');

const esCategoria = ( req , res = response , next ) => {
    const categoria = req.body.categoria.toUpperCase();
}

module.exports = {
    esCategoria
}