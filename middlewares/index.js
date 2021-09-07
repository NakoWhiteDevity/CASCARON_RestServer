const validaCampos = require('../middlewares/validarcampos');
const validaJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');
const validaCategorias = require('../middlewares/esCategoria');

module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles,
    ...validaCategorias
}