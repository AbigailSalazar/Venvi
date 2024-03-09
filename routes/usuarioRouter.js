const express = require('express')
const UsuarioController =require('../Controllers/usuariosController')
const router = express.Router();

router.get('/search',UsuarioController.obtenerUsuarioPorNombre);
router.get('/:id',UsuarioController.obtenerUsuarioPorId);
router.get('/',UsuarioController.obtenerUsuarios);

router.post('/',UsuarioController.crearUsuario);
router.patch('/:id/foto',UsuarioController.actualizarFoto);
router.patch('/:id/rating',UsuarioController.actualizarRating);
router.put('/:id',UsuarioController.actualizarUsuario);
router.delete('/:id',UsuarioController.eliminarUsuario)

module.exports = router;