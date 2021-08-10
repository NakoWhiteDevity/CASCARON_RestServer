const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGET, usuariosPOST, usuariosDELETE, usuariosPUT } = require('../controllers/user');

const _r = Router();

_r.get('/',usuariosGET);
_r.put('/:id',usuariosPUT);
_r.post('/',[
    check('correo','correo repetido').isEmail(),
],usuariosPOST);
_r.delete('/',usuariosDELETE);


module.exports = _r