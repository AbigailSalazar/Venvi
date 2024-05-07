const mongoose = require('mongoose');
const producto= require('./Producto');

const carritoSchema = new mongoose.Schema({
    idUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    total: Number,
    productos: [producto.schema]
});

module.exports = mongoose.model('Carrito', carritoSchema)