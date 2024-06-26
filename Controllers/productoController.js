const multimediaDAO = require('../dataAccess/multimediaDAO');
const productoDAO = require('../dataAccess/productosDAO')

const { AppError } = require('../utils/appError');

class ProductoController {
    static async crearProducto(req, res, next) {
        try {
            const { idVendedor, nombre, fotos, precio, cantidadDisponible } = req.body;
            if (!idVendedor, !fotos, !nombre || !precio || !cantidadDisponible) {
                next(new AppError('Los campos idVendedor, nombre, foto, precio y cantidad disponible son requeridos'))
                return;
            }

            const productoData = req.body
            const producto = await productoDAO.crearProducto(productoData);
            res.status(201).json(producto)

        } catch (error) {
            next(new AppError('Error al crear producto: ' + error.message, 500))
        }
    }

    static async obtenerPorductoPorId(req, res, next) {
        try {
            const id = req.params.id;
            const producto = await productoDAO.obtenerProductoPorId(id)

            if (!producto) {
                next(new AppError('Producto no encontrado'), 404)
            }
            res.status(200).json(producto)

        } catch (error) {
            next(new AppError(error.message, 500))
        }
    }

    static async obtenerPorductosPorNombre(req, res, next) {
        try {
            const nombre = req.query.nombre;
            const productos = await productoDAO.obtenerProductosPorNombre(nombre)

            if (!productos) {
                next(new AppError('Producto no encontrado'), 404)
            }
            res.status(200).json(productos)

        } catch (error) {
            next(new AppError('Error al buscar producto' + error.message, 500))
        }
    }

    static async obtenerPorductosPorVendedor(req, res, next) {
        try {
            const idVendedor = req.params.idVendedor;
            const productos = await productoDAO.obtenerProductosPorIdVendedor(idVendedor)

            if (!productos) {
                next(new AppError('Productos no encontrados'), 404)
            }
            res.status(200).json(productos)

        } catch (error) {
            next(new AppError('Error al buscar productos', 500))
        }
    }

    static async obtenerPorductosPorCategoria(req, res, next) {
        try {
            const categoria = req.params.categoria;
            const productos = await productoDAO.obtenerProductosPorCategoria(categoria)

            if (!productos) {
                next(new AppError('Productos no encontrados'), 404)
            }
            res.status(200).json(productos)

        } catch (error) {
            next(new AppError('Error al buscar productos', 500))
        }
    }

    static async obtenerPorductosPorPrecio(req, res, next) {
        try {
            const min = parseFloat(req.query.min);
            const max = parseFloat(req.query.max);
            console.log('obteniendo por rango:' + min + "," + max);
            if (!isNaN(min) && !isNaN(max)){
               
            const productos = await productoDAO.obtenerPorRangoPrecio(min, max)

            if (!productos) {
                next(new AppError('Productos no encontrados'), 404)
            }
            res.status(200).json(productos)
        }

        } catch(error) {
        next(new AppError('Error al buscar productos', 500))
    }
}

    static async obtenerPorductos(req, res, next) {
    try {
        const productos = await productoDAO.obtenerProductos()
        if (!productos) {
            next(new AppError('No hay productos'))
        }
        res.status(200).json(productos)

    } catch (error) {
        next(new AppError('Error al obtener productos', 500))
    }

}

static async obtenerPorductosPorFiltros(req, res, next) {
    try {
        const min = parseFloat(req.query.min);
        const max = parseFloat(req.query.max);
        const categoria = req.query.categoria;
        const nombre = req.query.nombre;

        const productos = await productoDAO.obtenerProductosByFiltros(nombre,categoria,min,max)
        if (!productos) {
            next(new AppError('No hay productos'))
        }
        res.status(200).json(productos)

    } catch (error) {
        next(new AppError('Error al obtener productos'+error.message, 500))
    }
}
    static async actualizarProducto(req, res, next) {
    try {
        const id = req.params.id

        const productoExist = await productoDAO.obtenerProductoPorId(id)

        if (!productoExist) {
            next(new AppError('Producto no encontrado', 404))
        }

        const productoData = req.body;
        const producto = await productoDAO.actualizarProducto(id, productoData)
        res.status(200).json(producto)

    } catch (error) {
        next(new AppError('Error al actualizar el producto', 500))
    }
}


    static async actualizarFoto(req, res, next) {
    try {
        const id = req.params.id
        const productoExist = await productoDAO.obtenerProductoPorId(id)

        if (!productoExist) {
            next(new AppError('Producto no encontrado', 404))
        }
        const foto = req.files;
        console.log(foto);
        if (foto) {
            const producto = await productoDAO.actualizarFotos(id, foto)
            if (!producto) {
                next(new AppError('Producto no encontrado'))
            }
            res.status(200).json(producto)
        }

    } catch (error) {
        next(new AppError('Error al actualizar fotos del producto ' + error.message, 500))
    }
}

static async eliminarFotos(req, res, next) {
    try {
        const fotos = req.body.fotos
        const id = req.params.id
        const productoExist = await productoDAO.obtenerProductoPorId(id)

        if (!productoExist) {
            next(new AppError('Producto no encontrado', 404))
        }
        if (fotos) {
            await productoDAO.eliminarFotos(id,fotos)
            res.status(200).json("Eliminado con exito")
        }

    } catch (error) {
        next(new AppError('Error al actualizar fotos del producto ' + error.message, 500))
    }
}

    static async actualizarPrecio(req, res, next) {
    try {
        const id = req.params.id

        const productoExist = await productoDAO.obtenerProductoPorId(id)

        if (!productoExist) {
            next(new AppError('Producto no encontrado', 404))
        }

        const { precio } = req.body;

        if (precio) {
            const producto = await productoDAO.actualizarPrecio(id, precio)
            if (!producto) {
                next(new AppError('Producto no encontrado'))
            }
            res.status(200).json(producto)
        }


    } catch (error) {
        next(new AppError('Error al actualizar fotos del producto', 500))
    }
}

    static async eliminarProducto(req, res, next) {
    try {
        const id = req.params.id

        const productoExist = await productoDAO.obtenerProductoPorId(id)

        if (!productoExist) {
            next(new AppError('Producto no encontrado', 404))
        }

        await productoDAO.eliminarProductoPorId(id,productoExist.fotos);
        res.status(200).json("Eliminado con exito")

    } catch (error) {
        next(new AppError('Error al eliminar producto', 500))
    }
}
}

module.exports = ProductoController