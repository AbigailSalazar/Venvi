const express = require('express')
const UsuarioController =require('../Controllers/usuariosController')
const jwtUtils = require('../utils/jwt')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const router = express.Router();

router.post('/autenticar',UsuarioController.autenticarUsuario);
router.get('/search',UsuarioController.obtenerUsuarioPorNombre);
router.get('/:id',jwtUtils.verifyToken,UsuarioController.obtenerUsuarioPorId);
router.get('/',UsuarioController.obtenerUsuarios);

router.post('/',upload.single('foto'),UsuarioController.crearUsuario);
router.patch('/:id/foto',jwtUtils.verifyTokenUser,UsuarioController.actualizarFoto);
router.patch('/:id/rating',jwtUtils.verifyToken,UsuarioController.actualizarRating);
router.put('/:id',jwtUtils.verifyTokenUser,UsuarioController.actualizarUsuario);
router.delete('/:id',jwtUtils.verifyTokenUser,UsuarioController.eliminarUsuario)

module.exports = router;