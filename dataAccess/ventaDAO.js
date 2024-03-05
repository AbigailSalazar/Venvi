const Venta = require("../entidades/Venta");

class VentaDAO { 
    //Metodo par crear nueva Venta
    static async crearVenta(idUsuario, idProducto, cantidadProducto, fecha, subtotal, envio, total, iva, direccionEnvio){
        try{
            const venta = new Venta({
                idUsuario,
                idProducto,
                cantidadProducto,
                fecha,
                subtotal,
                envio,
                total,
                iva, 
                direccionEnvio
            });
            await venta.save();
            return venta;
        }catch(error){
            throw new Error('Error al crear nueva venta: ' + error.message);
        }
    }

    //Metodo para obtener una venta por ID
    static async obtenerVentaPorId(ventaId){
        try{
            const venta = await Venta.findById(ventaId);
            return venta;
        }catch(error){
            throw new Error('Error al obtener venta: ' + error.message)
        }
    }

    //Metodo para Actualizar una venta por ID
    static async actualizarVenta(ventaId, idProducto, cantidadProducto, fecha, subtotal, envio, total, iva, direccionEnvio){
        try{
            const venta = await Venta.findByIdAndUpdate(ventaId, {idProducto, cantidadProducto, fecha, subtotal, envio, total, iva, direccionEnvio},{new: true});
            return venta;
        }catch (error){
            throw new Error('Error al actualizar venta: ' + error.message);
        }
    }

    //Metodo para Eliminar una venta por ID
    static async eliminarVenta(ventaId){
        try{
            await Venta.findByIdAndDelete(ventaId);
        }catch(error){
            throw new Error('Error al eliminar la venta: ' + error.message);
        }
    }
}

module.exports = VentaDAO;