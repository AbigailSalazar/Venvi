class Venta {
    constructor(id, idUsuario, idProducto, cantidadProducto, fecha, subtotal, envio, total, iva, direccionEnvio){
        this.id = id;
        this.idUsuario = idUsuario;
        this.idProducto = idProducto;
        this.cantidadProducto = cantidadProducto;
        this.fecha = fecha;
        this.subtotal = subtotal;
        this.envio = envio;
        this.total = total;
        this.iva = iva;
        this.direccionEnvio = direccionEnvio;
    }
}
module.exports = Venta