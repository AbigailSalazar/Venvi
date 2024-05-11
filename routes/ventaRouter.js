const express = require('express')
const VentaController =require('../Controllers/ventasController')
const jwtUtils = require('../utils/jwt')
const router = express.Router();

router.post('/',jwtUtils.verifyToken,VentaController.crearVenta);
router.get('/:id',jwtUtils.verifyToken,VentaController.obtenerVenta);
router.get('/usuario/:id',jwtUtils.verifyTokenUser,VentaController.obtenerVentasPorUsuario);
router.get('/vendedor/:id',jwtUtils.verifyTokenUser,VentaController.obtenerVentasPorVendedor);

router.put('/:id',jwtUtils.verifyToken,VentaController.actualizarVenta)
router.put('/:id/estado',jwtUtils.verifyToken,VentaController.actualizarEstadoVenta)
router.delete('/:id',jwtUtils.verifyToken,VentaController.eliminarVenta)


module.exports = router;