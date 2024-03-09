const categoriaProductoDAO = require('../dataAccess/categoriaProductoDAO')

const { AppError } = require('../utils/appError');

class CategoriaProductoController {
    static async crearCategoria(req, res, next) {
        try {
            const { nombre, descripcion } = req.body;
            if (!nombre, !descripcion) {
                next(new AppError('Los campos nombre y descripción son requeridos'))
            }

            //Verificar que la categoria no exista
            const categoriaProductoExist = await categoriaProductoDAO.obtenerCategoriaProductoPorNombre(nombre)

            if (categoriaProductoExist) {
                res.status(201).json(categoriaProductoExist)
            }
            else {
                const categoriaProductoData = req.body
                const categoriaProducto = await categoriaProductoDAO.crearCategoriaProducto(categoriaProductoData);
                res.status(201).json(categoriaProducto)
            }


        } catch (error) {
            next(new AppError('Error al crear la categoria', 500))
        }
    }

    static async obtenerCategoriaPorId(req, res, next) {
        try {
            const id = req.params.id;
            const categoriaProducto = await categoriaProductoDAO.obtenerCategoriaProductoPorId(id)

            if (!categoriaProducto) {
                next(new AppError('Categoria no encontrada'), 404)
            }
            res.status(200).json(categoriaProducto)

        } catch (error) {
            next(new AppError(error.message, 500))
        }
    }

    static async obtenerCategoriaPorNombre(req, res, next) {
        try {
            const nombre = req.query.nombre;
            const categoriaProductos = await categoriaProductoDAO.obtenerCategoriaProductoPorNombre(nombre)

            if (!categoriaProductos) {
                next(new AppError('Categoria no encontrada'), 404)
            }
            res.status(200).json(categoriaProductos)

        } catch (error) {
            next(new AppError('Error al buscar la categoria', 500))
        }
    }

    static async obtenerCategorias(req, res, next) {
        try {
            const categoriaProductos = await categoriaProductoDAO.obtenerCategoriaProductos()
            if (!categoriaProductos) {
                next(new AppError('No hay categorias'))
            }
            res.status(200).json(categoriaProductos)

        } catch (error) {
            next(new AppError('Error al obtener categoriaProductos', 500))
        }
    }

    static async actualizarCategoria(req, res, next) {
        try {
            const id = req.params.id

            const categoriaProductoExist = await categoriaProductoDAO.obtenerCategoriaProductoPorId(id)

            if (!categoriaProductoExist) {
                next(new AppError('Categoria no encontrada', 404))
            }

            const categoriaProductoData = req.body;
            const categoriaProducto = await categoriaProductoDAO.actualizarCategoriaProducto(id, categoriaProductoData)
            if (!categoriaProducto) {
                next(new AppError('Categoria no encontrada'))
            }
            res.status(200).json(categoriaProducto)

        } catch (error) {
            next(new AppError(error.message, 500))
        }
    }


    static async eliminarCategoria(req, res, next) {
        try {
            const id = req.params.id

            const categoriaProductoExist = await categoriaProductoDAO.obtenerCategoriaProductoPorId(id)

            if (!categoriaProductoExist) {
                next(new AppError('Categoria no encontrada', 404))
            }

            await categoriaProductoDAO.eliminarCategoriaProductoPorId(id);
            res.status(200).json("Eliminada con exito")

        } catch (error) {
            next(new AppError('Error al eliminar la categoria', 500))
        }
    }
}

module.exports = CategoriaProductoController