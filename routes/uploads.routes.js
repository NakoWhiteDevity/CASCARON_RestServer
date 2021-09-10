const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos , validArchivo } = require('../middlewares');
const { cargarArchivo, actualizarImagen, mostrarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers')

const _r = Router();

_r.post('/',validArchivo,cargarArchivo);

_r.put('/:coleccion/:id',[
    validArchivo,
    check('id','el id debe de ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],actualizarImagen);

_r.get('/:coleccion/:id',[
    check('id','el id debe de ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],mostrarImagen);

module.exports = _r;