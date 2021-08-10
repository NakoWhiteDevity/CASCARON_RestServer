/*
    {
        nombre: 'Carlos Test',
        correo: 'Carlos@correo.es',
        password: 'carlospass',
        img: 'cadena',
        rol: 'ADMIN',
        estado: boolean,
        google: boolean,
    }
*/

const { Schema , model } = require('mongoose');

const usuarioSchema = Schema({
    nombre:     { type:String , required:[true,'errorNombre'] },
    correo:     { type:String , required:[true,'errorCorreo'] },
    password:   { type:String , required:[true,'errorPass'] },
    img:        { type:String , required:[false] },
    rol:        { type:String , required:[true] , enum:['ADMIN','USER'] },
    estado:     { type:Boolean , default : true },
    google:     { type:Boolean , default : false }
});

module.exports = model( 'Usuario' , usuarioSchema )