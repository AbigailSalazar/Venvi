const express = require('express');
const router = express.Router();
const jwtUtils = require('../utils/jwt')
const direccionDeEnvioController = require('../Controllers/DireccionDeEnvioController');

// Rutas para la entidad Dirección de Envío
router.post('/',jwtUtils.verifyToken, direccionDeEnvioController.crearDireccionDeEnvio);
router.get('/:id', jwtUtils.verifyTokenUser,direccionDeEnvioController.obtenerDireccionDeEnvioByUser);
router.put('/:id',jwtUtils.verifyTokenUser, direccionDeEnvioController.actualizarDireccionDeEnvioByUser);
router.delete('/:id',jwtUtils.verifyToken, direccionDeEnvioController.eliminarDireccionDeEnvio);

module.exports = router;
