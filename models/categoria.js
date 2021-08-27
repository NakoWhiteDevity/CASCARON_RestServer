const { Schema , model } = require('mongoose');

const categoriaSchema = Schema({
    nombre:{type:String,required:[true,'el nombre es obligatorio'],unique:true},
    estado:{type:Boolean,default:true,required:true},
    usuario:{type:Schema,type:Schema.Types.ObjectId,ref:'Usuario',required:true}
});

categoriaSchema.methods.toJSON = function() {
    const { __v , ...categoria } = this.toObject();
    return categoria;

}

module.exports = model('Categoria',categoriaSchema);

/*
const RoleSchema = Schema({
    rol : { type : String , required:[true,'El rol es obligatorio'] }
});

module.exports = model( 'Role' , RoleSchema );
*/

//const dataSchema = new Schema({..}, { collection: 'data' });