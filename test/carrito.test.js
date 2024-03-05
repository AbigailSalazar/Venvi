const mongoose = require('mongoose');
const CarritoDAO = require('./carritoDAO');
const Carrito = require('./carritoModel');


beforeAll(async () => {
    // Conectar a una base de datos de prueba
    await mongoose.connect(process.env.URL_MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

afterAll(async () => {
    // Desconectar de la base de datos de prueba
    await mongoose.connection.close();
});

describe('Pruebas para CarritoDAO', () => {
    test('Crear un nuevo carrito', async () => {
        const carrito = await CarritoDAO.crearCarrito('usuario123', 50.0, [{ nombre: 'Producto 1', precio: 10.0, cantidad: 2 }]);
        expect(carrito.idUsuario).toBe('usuario123');
        expect(carrito.total).toBe(50.0);
        expect(carrito.productos.length).toBe(1);
    });

    test('Obtener un carrito por su ID', async () => {
        const carrito = await CarritoDAO.crearCarrito('usuario456', 60.0, [{ nombre: 'Producto 2', precio: 20.0, cantidad: 3 }]);
        const carritoEncontrado = await CarritoDAO.obtenerCarritoPorId(carrito._id);
        expect(carritoEncontrado.idUsuario).toBe('usuario456');
        expect(carritoEncontrado.total).toBe(60.0);
        expect(carritoEncontrado.productos.length).toBe(1);
    });

    test('Actualizar un carrito por su ID', async () => {
        const carrito = await CarritoDAO.crearCarrito('usuario789', 70.0, [{ nombre: 'Producto 3', precio: 30.0, cantidad: 1 }]);
        const carritoActualizado = await CarritoDAO.actualizarCarrito(carrito._id, 80.0, [{ nombre: 'Producto 4', precio: 40.0, cantidad: 2 }]);
        expect(carritoActualizado.total).toBe(80.0);
        expect(carritoActualizado.productos.length).toBe(1);
        expect(carritoActualizado.productos[0].nombre).toBe('Producto 4');
    });

    test('Eliminar un carrito por su ID', async () => {
        const carrito = await CarritoDAO.crearCarrito('usuario999', 90.0, [{ nombre: 'Producto 5', precio: 50.0, cantidad: 1 }]);
        await CarritoDAO.eliminarCarrito(carrito._id);
        const carritoEliminado = await CarritoDAO.obtenerCarritoPorId(carrito._id);
        expect(carritoEliminado).toBeNull();
    });

    // Agregar más pruebas según sea necesario
});
