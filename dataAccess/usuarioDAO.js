const Usuario = require('../models/Usuario')

class UsuarioDAO {
    constructor() {

    }

    async crearUsuario(usuarioData) {
        try {
            const usuario = new Usuario(usuarioData)
            return await usuario.save();
        } catch (error) {
            throw error
        }
    }

    async obtenerUsuarioPorId(id) {
        try {
            return await Usuario.findById(id)
        } catch (error) {
            throw error
        }
    }

    async obtenerUsuarioPorNombre(nombreBuscado) {
        try {
            return await Usuario.findOne({nombre:nombreBuscado})
        } catch (error) {
            throw error
        }
    }

    async obtenerUsuarios(){
        try {
            return await Usuario.find({})
        } catch (error) {
            throw error;
        }
    }

    
    async actualizarUsuario(id,usuario){
        try {
            return await Usuario.findByIdAndUpdate(id,usuario, {new:true})
        } catch (error) {
            throw error;
        }
    }

    async actualizarRating(id,nuevoRating){
        try {
            return await Usuario.findByIdAndUpdate(id,{rating:nuevoRating}, {new:true})
        } catch (error) {
            throw error;
        }
    }

    async actualizarFoto(id,nuevaFoto){
        try {
            return await Usuario.findByIdAndUpdate(id,{foto:nuevaFoto}, {new:true})
        } catch (error) {
            throw error;
        }
    }

    async eliminarUsuarioPorId(id){
        try {
            return await Usuario.findOneAndDelete(id)
        } catch (error) {
            throw error;
        }
    }

}
module.exports=new UsuarioDAO()