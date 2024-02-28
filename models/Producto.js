const mongoose = require('mongoose')

const categoriaProductoSchema=new mongoose.Schema({
    id:{
        type:mongoose.Schema.ObjectId,
        ref:'CategoriaProducto',
        require:true
    },
    nombre:{
        type:String,
        require:true
    },
    descripcion:{
        type:String,
        require:true
    },

})

const productoSchema=new mongoose.Schema({
    idVendedor:{
        type:mongoose.Schema.ObjectId,
        ref:'Usuario',
        require:true
    },
    nombre:{
        type:String,
        require:true
    },
    fotos:[String],
    precio:{
        type:Number,
        require:true
    },
    cantidadDisponible:{
        type:Number,
        require:true
    },
    descripcion:{
        type:String,
        require:true
    },
    categorias:[categoriaProductoSchema]
})

module.exports = mongoose.model('Producto',productoSchema)