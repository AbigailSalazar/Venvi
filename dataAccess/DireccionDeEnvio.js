const DireccionDeEnvio = require('./direccionDeEnvioModel');

class DireccionDeEnvioDAO {
    // Método para crear una nueva dirección de envío
    static async crearDireccion(idUsuario, calle, numero, estado, ciudad, codigoPostal, pais) {
        try {
            const direccion = new DireccionDeEnvio({
                idUsuario,
                calle,
                numero,
                estado,
                ciudad,
                codigoPostal,
                pais
            });
            await direccion.save();
            return direccion;
        } catch (error) {
            throw new Error('Error al crear la dirección de envío: ' + error.message);
        }
    }

    // Método para obtener una dirección de envío por su ID
    static async obtenerDireccionPorId(direccionId) {
        try {
            const direccion = await DireccionDeEnvio.findById(direccionId);
            return direccion;
        } catch (error) {
            throw new Error('Error al obtener la dirección de envío: ' + error.message);
        }
    }

    // Método para actualizar una dirección de envío por su ID
    static async actualizarDireccion(direccionId, calle, numero, estado, ciudad, codigoPostal, pais) {
        try {
            const direccion = await DireccionDeEnvio.findByIdAndUpdate(direccionId, { calle, numero, estado, ciudad, codigoPostal, pais }, { new: true });
            return direccion;
        } catch (error) {
            throw new Error('Error al actualizar la dirección de envío: ' + error.message);
        }
    }

    // Método para eliminar una dirección de envío por su ID
    static async eliminarDireccion(direccionId) {
        try {
            await DireccionDeEnvio.findByIdAndDelete(direccionId);
        } catch (error) {
            throw new Error('Error al eliminar la dirección de envío: ' + error.message);
        }
    }
}

module.exports = DireccionDeEnvioDAO;
