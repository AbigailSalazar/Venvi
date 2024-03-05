const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
    IdUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    total: Number,
    productos: [productoSchema]
});

module.exports = mongoose.model('Carrito', carritoSchema)