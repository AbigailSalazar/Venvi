const express = require('express')
const UsuarioController =require('../Controllers/usuariosController')
const jwtUtils = require('../utils/jwt')
const multer  = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

router.post('/autenticar',UsuarioController.autenticarUsuario);
router.get('/search',UsuarioController.obtenerUsuarioPorNombre);
router.get('/:id',jwtUtils.verifyToken,UsuarioController.obtenerUsuarioPorId);
router.get('/perfil/:id',UsuarioController.obtenerPerfilUsuarioPorId);
router.get('/',UsuarioController.obtenerUsuarios);

router.post('/',upload.single('foto'),UsuarioController.crearUsuario);
router.patch('/:id/foto',upload.single('foto'),jwtUtils.verifyTokenUser,UsuarioController.actualizarFoto);
router.patch('/:id/rating',jwtUtils.verifyToken,UsuarioController.actualizarRating);
router.put('/:id',jwtUtils.verifyTokenUser,UsuarioController.actualizarUsuario);
router.delete('/:id',jwtUtils.verifyTokenUser,UsuarioController.eliminarUsuario)

module.exports = router;