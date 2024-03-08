const express = require('express')
const app = express();
const morgan = require('morgan')
const {globalErrorHandler,AppError} = require('./utils/appError')
require('dotenv').config({path:'./variables.env'})
const db = require('./config/db');
const productoRouter= require('./routes/productoRouter')
const bodyParser = require('body-parser');

db.conectar();

app.use(bodyParser.json());
app.use(express.json())
app.use(morgan('combined'))

app.use('/api/productos',productoRouter)

app.all('*',(res,req,next)=>{
    const error = new AppError(`No se pudo acceder a la ruta: ${req.originalUrl} en el servicio web`)

})

app.use(globalErrorHandler)

const port = process.env.PORT||3000

app.listen(port,()=>{
    console.log(`El servidor esta escuchando en el puerto ${port}`)
})

