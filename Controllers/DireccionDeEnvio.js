const DireccionDeEnvioDAO = require('../dataAccess/DireccionDeEnvio');

// Controlador para crear una nueva dirección de envío
async function crearDireccionDeEnvio(req, res) {
    const { idUsuario, calle, numero, estado, ciudad, codigoPostal, pais } = req.body;
    try {
        const direccion = await DireccionDeEnvioDAO.crearDireccion(idUsuario, calle, numero, estado, ciudad, codigoPostal, pais);
        res.status(201).json(direccion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Controlador para obtener una dirección de envío por su ID
async function obtenerDireccionDeEnvio(req, res) {
    const direccionId = req.params.id;
    try {
        const direccion = await DireccionDeEnvioDAO.obtenerDireccionPorId(direccionId);
        if (!direccion) {
            res.status(404).json({ message: 'Dirección de envío no encontrada' });
        } else {
            res.json(direccion);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Controlador para actualizar una dirección de envío por su ID
async function actualizarDireccionDeEnvio(req, res) {
    const direccionId = req.params.id;
    const { calle, numero, estado, ciudad, codigoPostal, pais } = req.body;
    try {
        const direccionActualizada = await DireccionDeEnvioDAO.actualizarDireccion(direccionId, calle, numero, estado, ciudad, codigoPostal, pais);
        res.json(direccionActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Controlador para eliminar una dirección de envío por su ID
async function eliminarDireccionDeEnvio(req, res) {
    const direccionId = req.params.id;
    try {
        await DireccionDeEnvioDAO.eliminarDireccion(direccionId);
        res.json({ message: 'Dirección de envío eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { crearDireccionDeEnvio, obtenerDireccionDeEnvio, actualizarDireccionDeEnvio, eliminarDireccionDeEnvio };
