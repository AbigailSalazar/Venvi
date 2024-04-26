const Producto = require('../models/Producto');
const multimediaDAO = require('./multimediaDAO');

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
            if(id){
                return await Producto.findById(id)
            }
            else throw Error('Error al obtener producto: id nulo')
        } catch (error) {
            throw error
        }
    }

    async obtenerPorRangoPrecio(min,max){
        try {
            return await Producto.find({precio:{
                $gte: min, 
                $lte: max 
              }})
        } catch (error) {
            throw error
        }
    
    }

    async obtenerProductosPorNombre(nombreBuscado) {
        try {
            const palabrasABuscarArray = nombreBuscado.split(' ')
            const regex = new RegExp(palabrasABuscarArray.join('.*'), 'i');
            return await Producto.find({nombre:regex})
        } catch (error) {
            throw error
        }
    }

    async obtenerProductosByFiltros(nombre,categoria,min,max){
        try {

            let query = Producto.find();

            // Aplicar filtros
            if (nombre) {
                const palabrasABuscarArray = nombre.split(' ')
                const regex = new RegExp(palabrasABuscarArray.join('.*'), 'i');
                query = query.where('nombre', regex);
            }
            if (min) {
              query = query.where('precio').gte(min);
            }
            if (max) {
              query = query.where('precio').lte(max);
            }
            if(categoria){
                query = query.where('categorias').elemMatch({nombre: categoria })
            }
            // Agregar más filtros según tus necesidades
          
            const productos = await query.exec();
            return productos;
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
            if(nuevasFotos){
                const fotosURLs=[]
                for(const foto of nuevasFotos){
                    const url = await multimediaDAO.agregarImgProducto(id,foto)
                    fotosURLs.push(url)
                }
                return await Producto.findByIdAndUpdate(id,{ $push: { fotos: { $each: fotosURLs } } }, {new:true})
            }
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
            return await Producto.findOneAndDelete({ _id: id })
        } catch (error) {
            throw error;
        }
    }

}
module.exports=new ProductoDAO()