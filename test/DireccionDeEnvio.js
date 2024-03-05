const mongoose = require('mongoose');
const DireccionDeEnvioDAO = require('./direccionDeEnvioDAO');
const DireccionDeEnvio = require('./direccionDeEnvioModel');

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

describe('Pruebas para DireccionDeEnvioDAO', () => {
  test('Crear una nueva dirección de envío', async () => {
    const direccion = await DireccionDeEnvioDAO.crearDireccion('usuario123', 'Calle Principal', '123', 'Estado', 'Ciudad', '12345', 'País');
    expect(direccion.idUsuario).toBe('usuario123');
    expect(direccion.calle).toBe('Calle Principal');
    expect(direccion.numero).toBe('123');
    expect(direccion.estado).toBe('Estado');
    expect(direccion.ciudad).toBe('Ciudad');
    expect(direccion.codigoPostal).toBe('12345');
    expect(direccion.pais).toBe('País');
  });

  test('Obtener una dirección de envío por su ID', async () => {
    const direccion = await DireccionDeEnvioDAO.crearDireccion('usuario456', 'Avenida Principal', '456', 'Otro Estado', 'Otra Ciudad', '54321', 'Otro País');
    const direccionEncontrada = await DireccionDeEnvioDAO.obtenerDireccionPorId(direccion._id);
    expect(direccionEncontrada.idUsuario).toBe('usuario456');
    expect(direccionEncontrada.calle).toBe('Avenida Principal');
    expect(direccionEncontrada.numero).toBe('456');
    expect(direccionEncontrada.estado).toBe('Otro Estado');
    expect(direccionEncontrada.ciudad).toBe('Otra Ciudad');
    expect(direccionEncontrada.codigoPostal).toBe('54321');
    expect(direccionEncontrada.pais).toBe('Otro País');
  });

  test('Actualizar una dirección de envío por su ID', async () => {
    const direccion = await DireccionDeEnvioDAO.crearDireccion('usuario789', 'Calle 123', '789', 'Estado X', 'Ciudad Y', '99999', 'País Z');
    const direccionActualizada = await DireccionDeEnvioDAO.actualizarDireccion(direccion._id, 'Calle 456', '456', 'Nuevo Estado', 'Nueva Ciudad', '88888', 'Nuevo País');
    expect(direccionActualizada.calle).toBe('Calle 456');
    expect(direccionActualizada.numero).toBe('456');
    expect(direccionActualizada.estado).toBe('Nuevo Estado');
    expect(direccionActualizada.ciudad).toBe('Nueva Ciudad');
    expect(direccionActualizada.codigoPostal).toBe('88888');
    expect(direccionActualizada.pais).toBe('Nuevo País');
  });

  test('Eliminar una dirección de envío por su ID', async () => {
    const direccion = await DireccionDeEnvioDAO.crearDireccion('usuario999', 'Calle XYZ', '999', 'Estado A', 'Ciudad B', '77777', 'País C');
    await DireccionDeEnvioDAO.eliminarDireccion(direccion._id);
    const direccionEliminada = await DireccionDeEnvioDAO.obtenerDireccionPorId(direccion._id);
    expect(direccionEliminada).toBeNull();
  });

  // Agregar más pruebas según sea necesario
});
