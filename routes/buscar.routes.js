const { Router } = require('express');
const { buscar } = require('../controllers/buscar')

const _r = Router();

_r.get('/:coleccion/:termino',buscar)



module.exports = _r