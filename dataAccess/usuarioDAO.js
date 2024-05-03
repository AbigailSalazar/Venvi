const Usuario = require('../models/Usuario')
const multimediaDAO = require('../dataAccess/multimediaDAO');
const convertirImagen = require('../utils/convertirImagen');

class UsuarioDAO {
    constructor() {

    }

    async crearUsuario(usuarioData,foto) {
        try {
            const usuario = new Usuario(usuarioData);
            const newUser = await usuario.save();
            if (foto) {
               // const fotoURL = await multimediaDAO.agregarImgUsuario(newUser._id, foto); // guardar imagen de perfil si se registró correctamente
                await this.actualizarFoto(newUser._id, foto);
            }
            return newUser;
        } catch (error) {
            console.log(error);
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

    
    async obtenerPerfilUsuarioPorId(id) {
        try {
            const usuario = await Usuario.findById(id)
            usuario.password=""
            return usuario
        } catch (error) {
            throw error
        }
    }

    async obtenerUsuarioPorNombre(nombreBuscado) {
        try {
            return await Usuario.findOne({ nombre: nombreBuscado })
        } catch (error) {
            throw error
        }
    }

    async obtenerUsuarioPorCorreo(correoBuscado) {
        try {
            return await Usuario.findOne({ correo: correoBuscado })
        } catch (error) {
            throw error
        }
    }

    async obtenerUsuarios() {
        try {
            return await Usuario.find({})
        } catch (error) {
            throw error;
        }
    }


    async actualizarUsuario(id, usuario) {
        try {
            return await Usuario.findByIdAndUpdate(id, usuario, { new: true })
        } catch (error) {
            throw error;
        }
    }

    async actualizarRating(id, nuevoRating) {
        try {
            return await Usuario.findByIdAndUpdate(id, { rating: nuevoRating }, { new: true })
        } catch (error) {
            throw error;
        }
    }

    async actualizarFoto(id, nuevaFoto) {
        try {
            if (nuevaFoto) {
                const fotoURL = await multimediaDAO.agregarImgUsuario(id, nuevaFoto); // guardar imagen de perfil si se registró correctamente
                return await Usuario.findByIdAndUpdate(id, { foto: fotoURL }, { new: true })
            }
        } catch (error) {
            throw error;
        }
    }

    async eliminarUsuarioPorId(id) {
        try {
            return await Usuario.findOneAndDelete({ _id: id })
        } catch (error) {
            throw error;
        }
    }

}
module.exports = new UsuarioDAO()