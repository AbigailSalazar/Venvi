const firebaseApp = require('firebase/app');
const { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } = require('firebase/storage');
require('dotenv').config();
const ConvertirImagen = require('../utils/convertirImagen.js');

class MultimediaDAO {

    constructor() {
        const firebaseConfig = {
            apiKey: process.env.API_KEY,
            authDomain: process.env.AUTH_DOMAIN,
            projectId: process.env.PROJECT_ID,
            storageBucket: process.env.STORAGE_BUCKET,
            messagingSenderId: process.env.MESSAGING_SENDER_ID,
            appId: process.env.APP_ID,
        };
        // Inicializa Firebase
        firebaseApp.initializeApp(firebaseConfig);

        this.storage = getStorage();

        // Create a storage reference from our storage service
        this.usuariosRef = 'images/usuarios/'
        this.productosRef = 'images/productos/'

    }

    async agregarImgUsuario(idUsuario, file) {
        const metadata = {
            contentType: file.mimetype,
          };
        const storageRef =ref(this.storage, this.usuariosRef+idUsuario);
        console.log('guardando foto',file);
        // 'file' comes from the Blob or File API
        const snapshot = await uploadBytesResumable(storageRef, file.buffer,metadata)
        const downloadURL = await getDownloadURL(snapshot.ref)
        return downloadURL //regresar dirección de la imagen guardada

    }

    async agregarImgProducto(idProducto, file) {
        const metadata = {
            contentType: file.mimetype,
          };
        const storageRef =ref(this.storage, this.productosRef+idProducto+"/"+file.originalname);
        console.log('guardando foto',file);
        // 'file' comes from the Blob or File API
        const snapshot = await uploadBytesResumable(storageRef, file.buffer,metadata)
        const downloadURL = await getDownloadURL(snapshot.ref)
        return downloadURL //regresar dirección de la imagen guardada

    }


    async obtenerImgUsuario(idUsuario) {

    }

    async obtenerImgProducto(idProducto) {

    }

}

module.exports = new MultimediaDAO