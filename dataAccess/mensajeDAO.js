const Mensaje = require("../entidades/Mensaje");


class MensajeDAO{
    //Metodo para crear un mensaje
    static async crearMensaje(idUsuario, idVendedor, cabecera, cuerpoMensaje, fecha){
        try{
            const mensaje = new Mensaje({
                idUsuario,
                idVendedor,
                cabecera,
                cuerpoMensaje,
                fecha
            });
            await mensaje.save();
            return mensaje;
        }catch(error){
            throw new Error('Error al crear el mensaje: ' + error.message);
        }
    }

    //Metodo para obtener un mensaje por ID
    static async obtenerMensaje(mensajeId){
        try{
            const mensaje = await Mensaje.findById(mensajeId);
            return mensaje;
        }catch(error){
            throw new Error('Error al obtener mensaje: ' + error.message);
        }
    }

    //Metodo para actualizar un mensaje por ID
    static async actualizarMensaje(mensajeId, cabecera, cuerpoMensaje){
        try{
            const mensaje = await Mensaje.findByIdAndUpdate(mensajeId,{cabecera, cuerpoMensaje},{new: true});
            return mensaje;
        }catch(error){
            throw new Error('Error al actualizar el mensaje: ' + error.message);
        }    
    }

    //Metodo para eliminar un mensaje por ID
    static async eliminarMensaje(mensajeId){
        try{
            await Mensaje.findByIdAndDelete(mensajeId);
        }catch(error){
            throw new Error('Error al eliminar mensaje: '+ error.message);
        }
    }
}

module.exports = MensajeDAO;