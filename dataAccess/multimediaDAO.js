const firebaseApp = require('firebase/app');
const {getStorage,ref,uploadBytesResumable} = require('firebase/storage');
require('dotenv').config();

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
            contentType: file.type,
          };
        const storageRef =ref(this.storage, this.usuariosRef+idUsuario+"/"+file.name);
        console.log('guardando foto');
        // 'file' comes from the Blob or File API
        uploadBytesResumable(storageRef, file,metadata).then((snapshot) => {
            console.log('foto de perfil subida!');
        });
    }

    async agregarImgProducto(idProducto,file) {
        const metadata = {
            contentType: file.type,
          };
        const storageRef =ref(this.storage, this.productosRef+idProducto);

        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, file,metadata).then((snapshot) => {
            console.log('foto de perfil subida!');
        });
    }


    async obtenerImgUsuario(idUsuario) {

    }

    async obtenerImgProducto(idProducto) {

    }

}

module.exports= new MultimediaDAO