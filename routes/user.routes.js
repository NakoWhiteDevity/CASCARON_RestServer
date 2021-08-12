const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGET, usuariosPOST, usuariosDELETE, usuariosPUT } = require('../controllers/user');
const { validarCampos } = require('../middlewares/validarcampos');
const Role = require('../models/role');

const _r = Router();

_r.get('/',usuariosGET);
_r.put('/:id',usuariosPUT);
_r.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').isLength({min:6}),
    check('correo','correo repetido').isEmail(),
    //check('rol','No es un rol valido').isIn(['ADMIN','USER']),
    check('rol').custom( async(rol = "") => {
        const eROL = await Role.findOne({rol});
        if(!eROL){ throw new Error(`${eROL} no esta en BD`) }
    }),
    validarCampos
],usuariosPOST);
_r.delete('/',usuariosDELETE);


module.exports = _r