const { Router } = require('express');
const { usuariosGET, usuariosPOST, usuariosDELETE, usuariosPUT } = require('../controllers/user');

const _r = Router();

_r.get('/',usuariosGET);
_r.put('/:id',usuariosPUT);
_r.post('/',usuariosPOST);
_r.delete('/',usuariosDELETE);


module.exports = _r