const validaCampos = require('./validarcampos');
const validaJWT = require('./validar-jwt');
const validaRoles = require('./validar-roles');
const validaRyP = require('./propietarioyoadmin');
const validArchivo = require('./validarchivo')

module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles,
    ...validaRyP,
    ...validArchivo
}