const Producto = require('../models/Producto')

class ProductoDAO {
    constructor() {

    }

    async crearProducto(categoriaProductoData) {
        try {
            const usuario = new Producto(categoriaProductoData)
            return await usuario.save();
        } catch (error) {
            throw error
        }
    }

    async obtenerProductoPorId(id) {
        try {
            return await Producto.findById(id)
        } catch (error) {
            throw error
        }
    }

    async obtenerProductosPorNombre(nombreBuscado) {
        try {
            return await Producto.find({nombre:nombreBuscado})
        } catch (error) {
            throw error
        }
    }

    async obtenerProductosPorIdVendedor(idVendedorBuscado) {
        try {
            return await Producto.find({idVendedor:idVendedorBuscado})
        } catch (error) {
            throw error
        }
    }

    async obtenerProductosPorCategoria(categoria) {
        try {
            return await Producto.find({"categorias.nombre":categoria})
        } catch (error) {
            throw error
        }
    }

    async obtenerProductos(){
        try {
            return await Producto.find({})
        } catch (error) {
            throw error;
        }
    }

    async actualizarProducto(id,producto){
        try {
            return await Producto.findByIdAndUpdate(id,producto, {new:true})
        } catch (error) {
            throw error;
        }
    }

    async actualizarFotos(id,nuevasFotos){
        try {
            return await Producto.findByIdAndUpdate(id,{fotos:nuevasFotos}, {new:true})
        } catch (error) {
            throw error;
        }
    }

    async actualizarPrecio(id,nuevoPrecio){
        try {
            return await Producto.findByIdAndUpdate(id,{precio:nuevoPrecio}, {new:true})
        } catch (error) {
            throw error;
        }
    }

    async eliminarProductoPorId(id){
        try {
            return await Producto.findOneAndDelete(id)
        } catch (error) {
            throw error;
        }
    }

}
module.exports=new ProductoDAO()