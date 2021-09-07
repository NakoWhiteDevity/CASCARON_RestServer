const validaCampos = require('../middlewares/validarcampos');
const validaJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');
const validaRyP = require('../middlewares/propietarioyoadmin');

module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles,
    ...validaRyP
}