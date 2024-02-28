const CategoriaProducto = require('../entidades/CategoriaProducto');
const db = require('../config/db')
const CategoriaProductoDAO= require('../dataAccess/categoriaProductoDAO')

async function main(){
    await db.conectar().then(() => {
        console.log('conexion exitosa');
    }).catch((err) => {
      console.log(err);  
    });

    //Pruebas

    //crear
    await CategoriaProductoDAO.crearCategoriaProducto(new CategoriaProducto("Ropa de mujer","Ropa variada de mujer")).then(categoriaGuardado=>{
        console.log('CategoriaProducto creado con exito',categoriaGuardado);
    }).catch(err=>{
        console.log('Error al crear categoria',err);
    })

    
    await CategoriaProductoDAO.crearCategoriaProducto(new CategoriaProducto("Ropa de hombre","Ropa variada de hombre")).then(categoriaGuardado=>{
        console.log('CategoriaProducto creado con exito',categoriaGuardado);
    }).catch(err=>{
        console.log('Error al crear categoria',err);
    })

    
    await CategoriaProductoDAO.crearCategoriaProducto(new CategoriaProducto("Joyeria","Joyería variada")).then(categoriaGuardado=>{
        console.log('CategoriaProducto creado con exito',categoriaGuardado);
    }).catch(err=>{
        console.log('Error al crear categoria',err);
    })

     //consultar
     console.log('Consultando todos las categorias...');
     let consulta = await CategoriaProductoDAO.obtenerCategoriaProductos()
     console.log(consulta);
 
     console.log('Consultando categoria por id...');
     consulta = await CategoriaProductoDAO.obtenerCategoriaProductoPorId(consulta[1]._id)
     console.log(consulta);
 
     console.log('Consultando categoria por nombre -Joyeria-');
     consulta = await CategoriaProductoDAO.obtenerCategoriaProductoPorNombre('Joyeria')
     console.log(consulta);
 
     //actualizar
     console.log('Actualizando categoria Joyeria...');
     consulta = await CategoriaProductoDAO.obtenerCategoriaProductoPorNombre("Joyeria")
     const nuevoCategoriaProducto= new CategoriaProducto("Joyeria","Joyería de plata, oro y bronce")
     let categoriaActualizado = await CategoriaProductoDAO.actualizarCategoriaProducto(consulta.id,nuevoCategoriaProducto)
     console.log(categoriaActualizado);

     //eliminar
     console.log('Eliminando categoria por id...');
     let categoria = await CategoriaProductoDAO.obtenerCategoriaProductoPorNombre("Joyeria")
     consulta = await CategoriaProductoDAO.eliminarCategoriaProductoPorId(categoria._id)
 





    await db.desconectar().then(() => {
        console.log('desconexion exitosa');
    }).catch((err) => {
      console.log(err);  
    });
}

main()