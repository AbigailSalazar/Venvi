const mongoose = require('mongoose');

export const direccionEnvioSchema = new mongoose.Schema({
  idUsuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  calle: String,
  numero: String,
  estado: String,
  ciudad: String,
  codigoPostal: String,
  pais: String
});


module.exports = mongoose.model('DireccionDeEnvi0o', direccionEnvioSchema)
