const mongoose = require('mongoose')

const usuarioSchema=new mongoose.Schema({
    nombre:{
        type:String,
        require:true
    },
    foto:{
        type:String,
        require:false
    },
    password:{
        type:String,
        require:true
    },
    correo:{
        type:String,
        require: true
    },
    rating:{
        type:Number,
        require:true
    }
})

module.exports = mongoose.model('Usuario',usuarioSchema)