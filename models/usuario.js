/*
{
    "nombre":"Carlos Test",
    "correo":"Carlos@correo.es",
    "password":"carlospass",
    "img":"cadena",
    "rol":"ADMIN",
    "estado":"true",
    "google":"false"
}
*/

const { Schema , model } = require('mongoose');

const usuarioSchema = Schema({
    nombre:     { type:String , required:[true,'errorNombre'] },
    correo:     { type:String , required:[true,'errorCorreo'] },
    password:   { type:String , required:[true,'errorPass'] },
    img:        { type:String , required:[false] },
    rol:        { type:String , required:[true] },
    estado:     { type:Boolean , default : true },
    google:     { type:Boolean , default : false }
});

usuarioSchema.methods.toJSON = function() {
    const { __v , password , _id , ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;

}

module.exports = model( 'Usuario' , usuarioSchema )