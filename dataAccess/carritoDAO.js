const Carrito = require('../models/Carrito');

class CarritoDAO {
    // Método para crear un nuevo carrito
    static async crearCarrito(idUsuario, total, productos) {
        try {
            const carrito = new Carrito({
                idUsuario,
                total,
                productos
            });
            await carrito.save();
            return carrito;
        } catch (error) {
            throw new Error('Error al crear el carrito: ' + error.message);
        }
    }

    // Método para obtener un carrito por su ID
    static async obtenerCarritoPorId(carritoId) {
        try {
            const carrito = await Carrito.findById(carritoId);
            return carrito;
        } catch (error) {
            throw new Error('Error al obtener el carrito: ' + error.message);
        }
    }

       // Método para obtener un carrito por su ID usuario
       static async obtenerCarritoPorIdUsuario(usuarioId) {
        try {
            const carrito = await Carrito.findOne({idUsuario:usuarioId});
            return carrito;
        } catch (error) {
            throw new Error('Error al obtener el carrito: ' + error.message);
        }
    }

    // Método para actualizar un carrito por su ID
    static async actualizarCarritoPorIdUsuario(usuarioId, total, productos) {
        try {
            const carrito = await Carrito.findOneAndUpdate({idUsuario:usuarioId}, { total, productos }, { new: true });
            return carrito;
        } catch (error) {
            throw new Error('Error al actualizar el carrito: ' + error.message);
        }
    }

      // Método para actualizar un carrito por ID de usuario
      static async actualizarCarrito(usuarioId, total, productos) {
        try {
            const carrito = await Carrito.findByIdAndUpdate({idUsuario:usuarioId}, { total, productos }, { new: true });
            return carrito;
        } catch (error) {
            throw new Error('Error al actualizar el carrito: ' + error.message);
        }
    }

    static async agregarProductos(usuarioId,productos){
        try {
            const carrito = await Carrito.findOneAndUpdate({idUsuario:usuarioId},{
                $push: { productos: { $each: productos } },
                $inc: { total:productos.reduce((total, producto) => total + producto.precio, 0) }
            }, { new: true });
            return carrito;
        } catch (error) {
            throw new Error('Error al actualizar el carrito: ' + error.message);
        }
    }

    static async eliminarPorductos(usuarioId,productosEliminar){
        try {
            const totalRestar = productos.reduce((total, producto) => total + producto.precio, 0);

            const carrito = await Carrito.findOneAndUpdate({idUsuario:usuarioId},{
                $pull: { productos: { _id: { $in: productosEliminar } } },
                $inc:  { total: -totalRestar }  }, 
                { new: true });
            return carrito;
        } catch (error) {
            throw new Error('Error al actualizar el carrito: ' + error.message);
        }
    }

    // Método para eliminar un carrito por su ID
    static async eliminarCarrito(carritoId) {
        try {
            await Carrito.findByIdAndDelete({ _id: carritoId });
        } catch (error) {
            throw new Error('Error al eliminar el carrito: ' + error.message);
        }
    }
}

module.exports = CarritoDAO;
