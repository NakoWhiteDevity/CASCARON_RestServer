const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT , validarCampos , propietarioyoadmin } = require('../middlewares');
const { existeCategoria , existeProducto } = require('../helpers/db-validators');
const { crearPRODUCTO , obtenerPRODUCTOS , obtenerProductoSingular, borrarPRODUCTO , modificarPRODUCTO } = require('../controllers/productos');

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

//Modificar un producto - solo para admins y propietarios:
_r.put('/:id',[

],modificarPRODUCTO)

//Borrar producto - solo si se es admin o creador del producto
_r.delete('/:id',[
    validarJWT,
    check('id').custom( existeProducto ),
    propietarioyoadmin,
    validarCampos
],borrarPRODUCTO);



module.exports = _r