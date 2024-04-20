const express = require('express');
const router = express.Router();
const carritoController = require('../Controllers/carritoController');

// Rutas para la entidad Carrito
router.post('/carritos', carritoController.crearCarrito);
router.get('/carritos/:id', carritoController.obtenerCarrito);
router.put('/carritos/:id', carritoController.actualizarCarrito);
router.delete('/carritos/:id', carritoController.eliminarCarrito);

module.exports = router;
