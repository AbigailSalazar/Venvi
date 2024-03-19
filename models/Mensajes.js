const mongoose = require('mongoose');

const mensajeSchema = new mongoose.Schema({
    IdRemitente:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Usuario'
    },
    IdDestinatario:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Usuario'
    },
    contenido: String,
    fecha: Datetime,
    createdAt: Datetime,
    updatedAt: Datetime
})