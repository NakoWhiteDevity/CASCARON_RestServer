const { Router } = require('express');
const { check } = require('express-validator');
const { login , googleSI } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validarcampos');

const _r = Router();

_r.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatorio').not().isEmpty(),
    validarCampos
],login);

_r.post('/google',[
    check('id_token','El idtoken es necesario').not().isEmpty(),
    validarCampos
],googleSI);



module.exports = _r;