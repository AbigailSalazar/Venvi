const express = require('express')
const CategoriaProductoController =require('../Controllers/categoriaProductoController')
const router = express.Router();

router.get('/search',CategoriaProductoController.obtenerCategoriaPorNombre);
router.get('/:id',CategoriaProductoController.obtenerCategoriaPorId);
router.get('/',CategoriaProductoController.obtenerCategorias);

router.post('/',CategoriaProductoController.crearCategoria);
router.put('/:id',CategoriaProductoController.actualizarCategoria);
router.delete('/:id',CategoriaProductoController.eliminarCategoria)

module.exports = router;