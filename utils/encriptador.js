const CryptoJS = require("crypto-js");
require('dotenv').config();

class Encriptador{
    constructor() {}
    
    encriptar(mensaje){
        return CryptoJS.AES.encrypt(mensaje, process.env.SECRET_KEY).toString();
    }

    desencriptar(mensaje){
        return CryptoJS.AES.decrypt(mensaje, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
    }
}
module.exports=new Encriptador()