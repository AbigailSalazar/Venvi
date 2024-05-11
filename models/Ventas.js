const mongoose = require('mongoose')
const producto= require('./Producto');
const ventasSchema = new mongoose.Schema({
    idUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Usuario'
    },
    fecha: {
        type: Date,
        default: Date.now
      },
    subtotal: Number,
    envio: Number,
    total: Number,
    iva: Number,
    direccionEnvio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DireccionDeEnvio'
    },
    estado: {
        type: String,
        enum: ['pendiente', 'completada', 'cancelada'],
        default: 'pendiente'
      },
    productos:[producto.schema]
})


module.exports = mongoose.model('Venta',ventasSchema)

