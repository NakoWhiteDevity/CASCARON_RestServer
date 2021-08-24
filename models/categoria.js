const { Schema , model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre:{type:String,required:[true,'el nombre es obligatorio']},
    estado:{type:Boolean,default:true,required:true},
    usuario:{type:Schema.types.ObjectId,ref:'Usuario',require:true}
});

module.exports = model('Categoria',CategoriaSchema);

/*
const RoleSchema = Schema({
    rol : { type : String , required:[true,'El rol es obligatorio'] }
});

module.exports = model( 'Role' , RoleSchema );
*/

//const dataSchema = new Schema({..}, { collection: 'data' });