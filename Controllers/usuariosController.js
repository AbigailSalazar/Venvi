const usuarioDAO = require('../dataAccess/usuarioDAO')
const jwtUtils = require('../utils/jwt')

const { AppError } = require('../utils/appError');

class UsuarioController {

    static async autenticarUsuario(req, res, next) {
        try {
            const { correo, password } = req.body;
            const usuario = await usuarioDAO.obtenerUsuarioPorCorreo(correo)

            if (!usuario) {
                next(new AppError('Contraseña o correo incorrectos'), 404)
            }
            else if (usuario.password === password) {
                const userData = { id: usuario._id, nombre: usuario.nombre, correo: usuario.correo, foto:usuario.foto }
                const token = jwtUtils.generateToken(userData);
                res.json({ token });

            }
            else {
                next(new AppError('Contraseña o correo incorrectos'), 401)
            }
        } catch (error) {
            next(new AppError("Error al aurorizar al usuario" + error.message, 500))
        }
    }

    static async crearUsuario(req, res, next) {
        try {
            const { nombre, password, correo } = req.body;
            if (!nombre, !password, !correo) {
                next(new AppError('Los campos nombre, password y correo son requeridos'))
            }

            const usuarioData = req.body
            const foto = req.file
            const usuario = await usuarioDAO.crearUsuario(usuarioData,foto);
            res.status(201).json(usuario)

        } catch (error) {
            next(new AppError('Error al crear el usuario', 500))
        }
    }

    static async obtenerUsuarioPorId(req, res, next) {
        try {
            const id = req.params.id;
            const usuario = await usuarioDAO.obtenerUsuarioPorId(id)

            if (!usuario) {
                next(new AppError('Usuario no encontrado'), 404)
            }
            res.status(200).json(usuario)

        } catch (error) {
            next(new AppError("Error al obtener usuario", 500))
        }
    }

    static async obtenerPerfilUsuarioPorId(req, res, next) {
        try {
            const id = req.params.id;
            const usuario = await usuarioDAO.obtenerPerfilUsuarioPorId(id)

            if (!usuario) {
                next(new AppError('Usuario no encontrado'), 404)
            }
            res.status(200).json(usuario)

        } catch (error) {
            next(new AppError("Error al obtener usuario", 500))
        }
    }

    static async obtenerUsuarioPorNombre(req, res, next) {
        try {
            const nombre = req.query.nombre;
            const usuarios = await usuarioDAO.obtenerUsuarioPorNombre(nombre)

            if (!usuarios) {
                next(new AppError('Usuario no encontrado'), 404)
            }
            res.status(200).json(usuarios)

        } catch (error) {
            next(new AppError('Error al buscar el usuario', 500))
        }
    }

    static async obtenerUsuarios(req, res, next) {
        try {
            const usuarios = await usuarioDAO.obtenerUsuarios()
            if (!usuarios) {
                next(new AppError('No hay usuarios'))
            }
            res.status(200).json(usuarios)

        } catch (error) {
            next(new AppError('Error al obtener usuarios', 500))
        }
    }

    static async actualizarUsuario(req, res, next) {
        try {
            const id = req.params.id

            const usuarioExist = await usuarioDAO.obtenerUsuarioPorId(id)

            if (!usuarioExist) {
                next(new AppError('Usuario no encontrado', 404))
            }

            const usuarioData = req.body;
            const usuario = await usuarioDAO.actualizarUsuario(id, usuarioData)
            if (!usuario) {
                next(new AppError('Uusario no encontrado'))
            }
            res.status(200).json(usuario)

        } catch (error) {
            next(new AppError(error.message, 500))
        }
    }

    static async actualizarFoto(req, res, next) {
        try {
            const id = req.params.id;
    
            const usuarioExist = await usuarioDAO.obtenerUsuarioPorId(id);
    
            if (!usuarioExist) {
                return next(new AppError('Usuario no encontrado', 404));
            }
    
            const foto = req.file;
            if (!foto) {
                return next(new AppError('No se proporcionó una foto válida', 400));
            }
    
            const usuario = await usuarioDAO.actualizarFoto(id, foto);
            if (!usuario) {
                return next(new AppError('No se pudo actualizar la foto del usuario'+error.message, 500));
            }
    
            res.status(200).json(usuario);
        } catch (error) {
            next(new AppError('Error al actualizar foto del usuario: ' + error.message, 500));
        }
    }
    

    static async actualizarRating(req, res, next) {
        try {
            const id = req.params.id

            const usuarioExist = await usuarioDAO.obtenerUsuarioPorId(id)

            if (!usuarioExist) {
                next(new AppError('Usuario no encontrado', 404))
            }

            const { rating } = req.body;
            if (rating) {
                const usuario = await usuarioDAO.actualizarRating(id, rating)
                if (!usuario) {
                    next(new AppError('Usuario no encontrado'))
                }
                res.status(200).json(usuario)
            }

        } catch (error) {
            next(new AppError('Error el rating del usuario', 500))
        }
    }

    static async eliminarUsuario(req, res, next) {
        try {
            const id = req.params.id

            const usuarioExist = await usuarioDAO.obtenerUsuarioPorId(id)

            if (!usuarioExist) {
                next(new AppError('Categoria no encontrada', 404))
            }

            const resultado = await usuarioDAO.eliminarUsuarioPorId(id);
            res.status(200).json("Usuario eliminado con exito")

        } catch (error) {
            next(new AppError('Error al eliminar el usuario', 500))
        }
    }
}

module.exports = UsuarioController