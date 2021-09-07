const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT , validarCampos } = require('../middlewares');
const { existeCategoria , existeProducto } = require('../helpers/db-validators');
const { crearPRODUCTO , obtenerPRODUCTOS , obtenerProductoSingular } = require('../controllers/productos');

const _r = Router();

//Obtener producto por id:
_r.get('/:id',[
    check('id',"no es un id de producto válido").isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
],obtenerProductoSingular);

//Obtener listado de productos.
_r.get('/',obtenerPRODUCTOS);

//Crear Producto - privado y exclusivo para cualquiera con un token válido
_r.post('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoria ),
    validarCampos
],crearPRODUCTO);



module.exports = _r