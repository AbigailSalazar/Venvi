const CarritoDAO = require('../dataAccess/carritoDAO');

// Controlador para crear un nuevo carrito
async function crearCarrito(req, res) {
    const { idUsuario, total, productos } = req.body;
    try {
        const carrito = await CarritoDAO.crearCarrito(idUsuario, total, productos);
        res.status(201).json(carrito);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Controlador para obtener un carrito por su ID
async function obtenerCarrito(req, res) {
    const usuarioId = req.params.id;
    try {
        const carrito = await CarritoDAO.obtenerCarritoPorIdUsuario(usuarioId);
        if (!carrito) {
            res.status(404).json({ message: 'Carrito no encontrado' });
        } else {
            res.json(carrito);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Controlador para actualizar un carrito por su ID
async function actualizarCarrito(req, res) {
    const usuarioId = req.params.id;
    const { total, productos } = req.body;
    try {
        const carritoActualizado = await CarritoDAO.actualizarCarritoPorIdUsuario(usuarioId, total, productos);
        res.json(carritoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Controlador para actualizar un carrito por su ID
async function agregarProductos(req, res) {
    const usuarioId = req.params.id;
    const {productos} = req.body;
    try {
        const carritoActualizado = await CarritoDAO.agregarProductos(usuarioId,productos);
        res.json(carritoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Controlador para actualizar un carrito por su ID
async function eliminarProductos(req, res) {
    const usuarioId = req.params.id;
    const {productos} = req.body;
    try {
        const carritoActualizado = await CarritoDAO.eliminarPorductos(usuarioId,productos);
        res.json(carritoActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// Controlador para eliminar un carrito por su ID
async function eliminarCarrito(req, res) {
    const carritoId = req.params.id;
    try {
        await CarritoDAO.eliminarCarrito(carritoId);
        res.json({ message: 'Carrito eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { crearCarrito, obtenerCarrito, actualizarCarrito, eliminarCarrito,agregarProductos,eliminarProductos };
