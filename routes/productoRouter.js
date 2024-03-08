const express = require('express')
const ProductoController =require('../Controllers/productoController')
const router = express.Router();

router.get('/search',ProductoController.obtenerPorductosPorNombre);
router.get('/categorias/:categoria',ProductoController.obtenerPorductosPorCategoria);
router.get('/:id',ProductoController.obtenerPorductoPorId);
router.get('/',ProductoController.obtenerPorductos);

router.post('/',ProductoController.crearProducto);
router.patch('/:id/fotos',ProductoController.actualizarFoto);
router.patch('/:id/precio',ProductoController.actualizarPrecio);
router.put('/:id',ProductoController.actualizarProducto);
router.delete('/:id',ProductoController.eliminarProducto)

module.exports = router;