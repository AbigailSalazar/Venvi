const db = require('../config/db')
const Usuario = require('../entidades/Usuario');
const Producto = require('../entidades/Producto');
const ProductoDAO = require('../dataAccess/productosDAO')
const CategoriaProductoDAO = require('../dataAccess/categoriaProductoDAO')
const CategoriaProducto = require('../entidades/CategoriaProducto')

const UsuarioDAO = require('../dataAccess/usuarioDAO')

async function main() {
    await db.conectar().then(() => {
        console.log('conexion exitosa');
    }).catch((err) => {
        console.log(err);
    });

    //Pruebas
    try {

        //crear vendedor de prueba
        const usuarioGuardado = await UsuarioDAO.crearUsuario(new Usuario("Sandra Lopez", null, "123456", "maria@gmail.com", 10));
        console.log('Usuario creado con exito', usuarioGuardado);

        //crear categoria de prueba
        const categoriaGuardado = await CategoriaProductoDAO.crearCategoriaProducto(new CategoriaProducto("Ropa de mujer", "Ropa variada de mujer"));
        console.log('CategoriaProducto creado con exito', categoriaGuardado);

        //crear productos
        const productoGuardado = await ProductoDAO.crearProducto(new Producto(usuarioGuardado._id, "Pantalon", null, 150, 2, "Pantalones talla mediada", [categoriaGuardado]));
        console.log('Producto creado con exito', productoGuardado);

        const productoGuardado2 = await ProductoDAO.crearProducto(new Producto(usuarioGuardado._id, "Blusa", null, 100, 4, "Blusas talla mediada", [categoriaGuardado]))
        console.log('Producto creado con exito', productoGuardado2);


        //consultar
        console.log('Consultando todos los productos...');
        let consulta = await ProductoDAO.obtenerProductos()
        console.log(consulta);

        console.log('Consultando producto por id...');
        consulta = await ProductoDAO.obtenerProductoPorId(consulta[1]._id)
        console.log(consulta);

        console.log('Consultando productos por id vendedor -Sandra Lopez-');
        consulta = await ProductoDAO.obtenerProductosPorIdVendedor(usuarioGuardado._id)
        console.log(consulta);

        console.log('Consultando productos por nombre -Blusa-');
        consulta = await ProductoDAO.obtenerProductosPorNombre("Blusa")
        console.log(consulta);

        console.log('Consultando productos por categoria -Ropa de mujer-');
        consulta = await ProductoDAO.obtenerProductosPorCategoria("Ropa de mujer")
        console.log(consulta);


        //actualizar
        console.log('Actualizando producto pantalon...');
        const nuevoProducto = new Producto(usuarioGuardado._id, "Pantalon", null, 140, 4, "pantalon talla chica", [categoriaGuardado])
        let productoActualizado = await ProductoDAO.actualizarProducto(productoGuardado._id, nuevoProducto)
        console.log(productoActualizado);

        //actualizar foto
        console.log('Actualizando foto de pantalon...');
        productoActualizado = await ProductoDAO.actualizarFotos(productoGuardado._id, ["Link foto nueva 1", "Link foto nueva 2"])
        console.log(productoActualizado);

        //actualizar precio
        console.log('Actualizando precio de pantalon...');
        usuarioActualizado = await ProductoDAO.actualizarPrecio(productoGuardado._id, 180)
        console.log(productoActualizado);

        //eliminar
        console.log('Eliminando producto Pantalon por id...');
        consulta = await ProductoDAO.eliminarProductoPorId(productoGuardado2._id)

    } catch (err) {
        console.log('Error:', err);
    }


    await db.desconectar().then(() => {
        console.log('desconexion exitosa');
    }).catch((err) => {
        console.log(err);
    });
}

main()