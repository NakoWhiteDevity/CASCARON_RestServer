const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos , validArchivo } = require('../middlewares');
const { cargarArchivo, actualizarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers')

const _r = Router();

_r.post('/',validArchivo,cargarArchivo);

_r.put('/:coleccion/:id',[
    validArchivo,
    check('id','el id debe de ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],actualizarImagen);

module.exports = _r;