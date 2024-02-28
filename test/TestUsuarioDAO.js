const Usuario = require('../entidades/Usuario');
const db = require('../config/db')
const UsuarioDAO= require('../dataAccess/usuarioDAO')

async function main(){
    await db.conectar().then(() => {
        console.log('conexion exitosa');
    }).catch((err) => {
      console.log(err);  
    });

    //Pruebas

    //crear
    await UsuarioDAO.crearUsuario(new Usuario("Sandra Lopez",null,"123456","maria@gmail.com",10)).then(usuarioGuardado=>{
        console.log('Usuario creado con exito',usuarioGuardado);
    }).catch(err=>{
        console.log('Error al crear usuario',err);
    })

    
    await UsuarioDAO.crearUsuario(new Usuario("Jesus Ruiz",null,"123456","jorge@gmail.com",9)).then(usuarioGuardado=>{
        console.log('Usuario creado con exito',usuarioGuardado);
    }).catch(err=>{
        console.log('Error al crear usuario',err);
    })

    
    await UsuarioDAO.crearUsuario(new Usuario("Maria Hernandez",null,"123456","paola@gmail.com",8)).then(usuarioGuardado=>{
        console.log('Usuario creado con exito',usuarioGuardado);
    }).catch(err=>{
        console.log('Error al crear usuario',err);
    })

     //consultar
     console.log('Consultando todos los usuarios...');
     let consulta = await UsuarioDAO.obtenerUsuarios()
     console.log(consulta);
 
     console.log('Consultando usuario por id...');
     consulta = await UsuarioDAO.obtenerUsuarioPorId(consulta[1]._id)
     console.log(consulta);
 
     console.log('Consultando usuario por nombre -Maria Lopez-');
     consulta = await UsuarioDAO.obtenerUsuarioPorNombre('Maria Hernandez')
     console.log(consulta);
 
     //actualizar
     console.log('Actualizando usuario Jesus Ruiz...');
     consulta = await UsuarioDAO.obtenerUsuarioPorNombre("Jesus Ruiz")
     const nuevoUsuario= new Usuario("Jesus Ruiz",null,"123456","jesus.ruiz@gmail.com",8)
     let usuarioActualizado = await UsuarioDAO.actualizarUsuario(consulta.id,nuevoUsuario)
     console.log(usuarioActualizado);

     //actualizar foto
     console.log('Actualizando foto de Jesus Ruiz...');
     usuarioActualizado = await UsuarioDAO.actualizarFoto(consulta.id,"Link foto nueva")
     console.log(usuarioActualizado);

     //actualizar rating
     console.log('Actualizando rating de Jesus Ruiz...');
     usuarioActualizado = await UsuarioDAO.actualizarRating(consulta.id,8.5)
     console.log(usuarioActualizado);

     //eliminar
     console.log('Eliminando usuario por id...');
     let usuario = await UsuarioDAO.obtenerUsuarioPorNombre('Jesus Ruiz')
     consulta = await UsuarioDAO.eliminarUsuarioPorId(usuario._id)
 





    await db.desconectar().then(() => {
        console.log('desconexion exitosa');
    }).catch((err) => {
      console.log(err);  
    });
}

main()