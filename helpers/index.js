const dbvalidators = require('./db-validators');
const generarJWT = require('./gJWT');
const googleVerify = require('./googleVerify');
const subirarchivo = require('./subirarchivo');

module.exports = { ...dbvalidators, ...generarJWT, ...googleVerify, ...subirarchivo };