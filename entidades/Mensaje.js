class Mensaje{
    constructor(id, idUsuario, idVendedor, cabecera, cuerpoMensaje, fecha){
        this.id = id;
        this.idUsuario = idUsuario;
        this.idVendedor = idVendedor;
        this.cabecera = cabecera;
        this.cuerpoMensaje = cuerpoMensaje;
        this.fecha = fecha;
    }
}

module.exports = Mensaje;