const express = require('express');
const router = express.Router();
const direccionDeEnvioController = require('./direccionDeEnvioController');

// Rutas para la entidad Dirección de Envío
router.post('/direcciones-envio', direccionDeEnvioController.crearDireccionDeEnvio);
router.get('/direcciones-envio/:id', direccionDeEnvioController.obtenerDireccionDeEnvio);
router.put('/direcciones-envio/:id', direccionDeEnvioController.actualizarDireccionDeEnvio);
router.delete('/direcciones-envio/:id', direccionDeEnvioController.eliminarDireccionDeEnvio);

module.exports = router;
