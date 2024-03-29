const VentaDAO = require('../dataAccess/ventaDAO');

//Controlador para crear nueva venta
async function crearVenta(req,res){
    const { idUsuario,idProducto,cantidadProducto,fecha,subtotal,envio,total,iva,direccionEnvio } = req.body;
    try{
        const venta = await VentaDAO.crearVenta(idUsuario,idProducto,cantidadProducto,fecha,subtotal,envio,total,iva,direccionEnvio);
        res.status(201).json(venta);
    } catch(error){
        res.status(500).json({error: error.message});
    }
}

//Controlador para obtener una venta por ID
async function obtenerVenta(req,res){
    const ventaId = req.params.id;
    try{
        const venta = await VentaDAO.obtenerVentaPorId(ventaId);
        if(!venta){
            res.status(404).json({message: 'Venta no encontrada'});
        }else{
            res.json(venta);
        }
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

//Controlador para actualizar venta por ID
async function actualizarVenta(req,res){
    const ventaId = req.params.id;
    const { idProducto,cantidadProducto,fecha,subtotal,envio,total,iva,direccionEnvio } = req.body;
    try{
        const ventaActualizada = await VentaDAO.actualizarVenta(ventaId,idProducto,cantidadProducto,fecha,subtotal,envio,total,iva,direccionEnvio);
        res.json(ventaActualizada);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

//Controlador para eliminar una venta por ID
async function eliminarVenta(req,res){
    const ventaId = req.params.id;
    try{
        await VentaDAO.eliminarVenta(ventaId);
        res.json({message: 'Venta eliminada correctamente'});
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports = {crearVenta, obtenerVenta, actualizarVenta, eliminarVenta};