const Carrito = require('./carritoModel');

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

    // Método para actualizar un carrito por su ID
    static async actualizarCarrito(carritoId, total, productos) {
        try {
            const carrito = await Carrito.findByIdAndUpdate(carritoId, { total, productos }, { new: true });
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
