const CategoriaProducto = require('../models/CategoriaProducto')

class CategoriaProductoDAO {
    constructor() {

    }

    async crearCategoriaProducto(categoriaProductoData) {
        try {
            const categoria = new CategoriaProducto(categoriaProductoData)
            return await categoria.save();
        } catch (error) {
            throw error
        }
    }

    async obtenerCategoriaProductoPorId(id) {
        try {
            return await CategoriaProducto.findById(id)
        } catch (error) {
            throw error
        }
    }

    async obtenerCategoriaProductoPorNombre(nombreBuscado) {
        try {
            return await CategoriaProducto.findOne({nombre:nombreBuscado})
        } catch (error) {
            throw error
        }
    }

    async obtenerCategoriaProductos(){
        try {
            return await CategoriaProducto.find({})
        } catch (error) {
            throw error;
        }
    }

    
    async actualizarCategoriaProducto(id,categoria){
        try {
            return await CategoriaProducto.findByIdAndUpdate(id,categoria, {new:true})
        } catch (error) {
            throw error;
        }
    }
    async eliminarCategoriaProductoPorId(id){
        try {
            return await CategoriaProducto.findOneAndDelete(id)
        } catch (error) {
            throw error;
        }
    }

}
module.exports=new CategoriaProductoDAO()