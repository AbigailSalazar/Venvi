const express = require('express')
const ProductoController =require('../Controllers/productoController')
const jwtUtils = require('../utils/jwt')
const multer  = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

router.get('/search',ProductoController.obtenerPorductosPorNombre);
router.get('/categorias/:categoria',ProductoController.obtenerPorductosPorCategoria);
router.get('/filtros/precio/',ProductoController.obtenerPorductosPorPrecio);

router.get('/:id',ProductoController.obtenerPorductoPorId);
router.get('/vendedores/:idVendedor',ProductoController.obtenerPorductosPorVendedor);
router.get('/',ProductoController.obtenerPorductos);

router.post('/',jwtUtils.verifyToken,ProductoController.crearProducto);
router.patch('/:id/fotos',upload.array('fotos'),jwtUtils.verifyToken,ProductoController.actualizarFoto);
router.patch('/:id/precio',jwtUtils.verifyToken,ProductoController.actualizarPrecio);
router.put('/:id',jwtUtils.verifyToken,ProductoController.actualizarProducto);
router.delete('/:id',jwtUtils.verifyToken,ProductoController.eliminarProducto)

module.exports = router;