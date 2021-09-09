const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarcampos');
const { cargarArchivo } = require('../controllers/uploads');

const _r = Router();

_r.post('/',cargarArchivo);

module.exports = _r;