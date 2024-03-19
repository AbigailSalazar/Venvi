const mongoose = require('mongoose')

const ventasSchema = new mongoose.Schema({
    IdUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Usuario'
    },
    fecha: Datetime,
    subtotal: Decimal,
    envio: Decimal,
    total: Decimal,
    iva: int,
    IdDireccionEnvio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DireccionDeEnvio'
    },
    createdAt: Datetime,
    updatedAt: Datetime
})

