const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria } = require('../controllers/categorias');
const { validarJWT , validarCampos , existeCategoria } = require('../middlewares');

const _r = Router();

//{{url}}/api/categorias

//necesitas un middleware que valide el id de usuario.

//Obtener todas las categorias - publico
_r.get('/',[
    check('id').custom( existeCategoria )
],(req,res) => {
    res.json('G U C C I - get');
});

//Obtener una categoria por id - publico
_r.get('/:id',(req,res) => {
    res.json("G U C C I - getID");
});

//Crear categoria - privado y exclusivo para cualquier persona con un token válido.
_r.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria);

//Actualizar - privado - cualquiera con token válido.
_r.put('/:id',(req,res) => {
    res.json('G U C C I - putID');
});

//Borrar una categoria - admin
_r.delete('/:id', (req,res) => {
    res.json('G U C C I - delete')
})



module.exports = _r