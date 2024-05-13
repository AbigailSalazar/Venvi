class Venta {
    constructor(id, idUsuario, cantidadProducto, fecha, subtotal, envio, total, iva, direccionEnvio,productos){
        this.id = id;
        this.idUsuario = idUsuario;
        this.cantidadProducto = cantidadProducto;
        this.fecha = fecha;
        this.subtotal = subtotal;
        this.envio = envio;
        this.total = total;
        this.iva = iva;
        this.direccionEnvio = direccionEnvio;
        this.productos=productos
    }
}
module.exports = Venta