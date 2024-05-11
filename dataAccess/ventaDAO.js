const Venta = require("../models/Ventas");

class VentaDAO {
    //Metodo par crear nueva Venta
    static async crearVenta(idUsuario, subtotal, envio, total, iva, direccionEnvio, productos) {
        try {
            const venta = new Venta({
                idUsuario,
                subtotal,
                envio,
                total,
                iva,
                direccionEnvio,
                productos
            });
            await venta.save();
            return venta;
        } catch (error) {
            throw new Error('Error al crear nueva venta: ' + error.message);
        }
    }

    //Metodo para obtener una venta por ID
    static async obtenerVentaPorId(ventaId) {
        try {
            const venta = await Venta.findById(ventaId);
            return venta;
        } catch (error) {
            throw new Error('Error al obtener venta: ' + error.message)
        }
    }

    //Metodo para obtener una venta por ID
    static async obtenerVentaPorIdUsuario(usuarioId) {
        try {
            const venta = await Venta.find({ idUsuario: usuarioId });
            return venta;
        } catch (error) {
            throw new Error('Error al obtener venta: ' + error.message)
        }
    }

    static async obtenerVentasPorVendedor(vendedorId) {
        try {
            const ventas = await Venta.find({ 'productos.idVendedor': vendedorId }, { productos: 1, idUsuario: 1 });
            return ventas
        } catch (error) {
            throw new Error('Error al obtener ventas: ' + error.message)
        }

    }

    //Metodo para Actualizar una venta por ID
    static async actualizarVenta(ventaId, idUsuario, subtotal, envio, total, iva, direccionEnvio, productos) {
        try {
            const venta = await Venta.findByIdAndUpdate(ventaId,
                {
                    idUsuario,
                    subtotal,
                    envio,
                    total,
                    iva,
                    direccionEnvio,
                    productos
                },
                { new: true });
            return venta;
        } catch (error) {
            throw new Error('Error al actualizar venta: ' + error.message);
        }
    }


    //Metodo para Eliminar una venta por ID
    static async actualizarEstado(ventaId, estado) {
        try {
           return  await Venta.findByIdAndUpdate(ventaId, { estado: estado },
            { new: true });
        } catch (error) {
            throw new Error('Error al eliminar la venta: ' + error.message);
        }
    }


    //Metodo para Eliminar una venta por ID
    static async eliminarVenta(ventaId) {
        try {
            await Venta.findByIdAndDelete(ventaId);
        } catch (error) {
            throw new Error('Error al eliminar la venta: ' + error.message);
        }
    }
}

module.exports = VentaDAO;