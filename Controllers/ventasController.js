const VentaDAO = require('../dataAccess/ventaDAO');
const ProductoDAO = require('../dataAccess/productosDAO');

//Controlador para crear nueva venta
async function crearVenta(req, res) {
    const { idUsuario, subtotal, envio, total, iva, direccionEnvio, productos } = req.body;
    try {
        for (const producto of productos) {//reducir la cantidad de cada producto
            const productoObtenido = await ProductoDAO.obtenerProductoPorId(producto._id)
            if (productoObtenido.cantidadDisponible - producto.cantidadDisponible < 0) {
                res.status(401).json({ error: "Uno de los productos excede su cantidad disponible" });
                return
            }
            if(producto.idVendedor==idUsuario){
                res.status(401).json({ error: "Un usuario no  puede comprar sus propios productos" });
                return
            }
        }
        const venta = await VentaDAO.crearVenta(idUsuario, subtotal, envio, total, iva, direccionEnvio, productos);
        if (venta) {
            for (const producto of productos) {//actualizar cantidad de productos
                const productoActlz = await ProductoDAO.actualizarCantidad(producto._id, -producto.cantidadDisponible)
            }
        }
        res.status(201).json(venta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//Controlador para obtener una venta por ID
async function obtenerVenta(req, res) {
    const ventaId = req.params.id;
    try {
        const venta = await VentaDAO.obtenerVentaPorId(ventaId);
        if (!venta) {
            res.status(404).json({ message: 'Venta no encontrada' });
        } else {
            res.json(venta);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//Controlador para obtener una venta por ID
async function obtenerVentasPorUsuario(req, res) {
    const idUsuario = req.params.id;
    try {
        const venta = await VentaDAO.obtenerVentaPorIdUsuario(idUsuario);
        if (!venta) {
            res.status(404).json({ message: 'Venta no encontrada' });
        } else {
            res.json(venta);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function obtenerVentasPorVendedor(req, res) {
    const idVendedor = req.params.id;
    try {
        const productosVendidos = await VentaDAO.obtenerVentasPorVendedor(idVendedor);
        if (!productosVendidos) {
            res.status(404).json({ message: 'Venta no encontrada' });
        } else {
            res.json(productosVendidos);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


async function actualizarEstadoVenta(req, res) {
    const idVenta = req.params.id;
    const estado = req.body.estado;
    try {
        const venta = await VentaDAO.actualizarEstado(idVenta, estado);
        if (!venta) {
            res.status(404).json({ message: 'Venta no encontrada' });
        } else {
            res.json(venta);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//Controlador para actualizar venta por ID
async function actualizarVenta(req, res) {
    const ventaId = req.params.id;
    const { idUsuario, subtotal, envio, total, iva, direccionEnvio, productos } = req.body;
    try {
        const ventaActualizada = await VentaDAO.actualizarVenta(ventaId, idUsuario, subtotal, envio, total, iva, direccionEnvio, productos);
        res.json(ventaActualizada);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//Controlador para eliminar una venta por ID
async function eliminarVenta(req, res) {
    const ventaId = req.params.id;
    try {
        await VentaDAO.eliminarVenta(ventaId);
        res.json({ message: 'Venta eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { crearVenta, obtenerVenta, actualizarEstadoVenta, obtenerVentasPorUsuario, obtenerVentasPorVendedor, actualizarVenta, eliminarVenta };