const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarcampos');
const { cargarArchivo } = require('../controllers/uploads');
const { subirArchivo } = require('../helpers')

const _r = Router();

_r.post('/',cargarArchivo);

module.exports = _r;