const express = require('express');
const router = express.Router();
const carritoController = require('../Controllers/carritoController');
const jwtUtils = require('../utils/jwt')
// Rutas para la entidad Carrito
router.post('/', jwtUtils.verifyToken,carritoController.crearCarrito);
router.get('/:id',jwtUtils.verifyTokenUser, carritoController.obtenerCarrito);
router.put('/:id',jwtUtils.verifyTokenUser, carritoController.actualizarCarrito);
router.put('/:id/productos',jwtUtils.verifyTokenUser, carritoController.agregarProductos);
router.delete('/:id',jwtUtils.verifyTokenUser, carritoController.eliminarCarrito);
router.delete('/:id/productos',jwtUtils.verifyTokenUser, carritoController.eliminarProductos);

module.exports = router;
