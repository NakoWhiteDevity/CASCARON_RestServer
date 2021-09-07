const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT , validarCampos } = require('../middlewares');
const { existeCategoria } = require('../helpers/db-validators');
const { crearPRODUCTO } = require('../controllers/productos');

const _r = Router();

//Crear Producto - privado y exclusivo para cualquiera con un token válido
_r.post('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoria ),
    validarCampos
],crearPRODUCTO)

module.exports = _r