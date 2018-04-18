const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const logger = require('morgan')
const path = require('path')
const config  = require('./api/config/configuration')


//	Inicializar la aplicacion
const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)
//Socket global para toda la aplicacion
global.io = io

//	Configuraciones
const PORT = config.PORT || process.env.PORT
const DB_URL = config.CON_STRING

//	Rutas de la Aplicacion
const app_routes = require('./api/routes/app.routes')
const product_routes = require('./api/routes/product.routes')

//	Middleware - CORS de la Api Restfull
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods" , "POST, GET, PUT, DELETE, OPTIONS")
     next()
 })

//  Morgan
app.use(logger('dev'));
//	Body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use( bodyParser.json() )

//  Conexion de la BD Mongo DB
mongoose.connect(DB_URL , err => {
    if( !err ) console.log('ONLINE MONGODB')
    if( err ) throw err
})


//	Configuraciones de la rutas y sockets
app.use(express.static(path.join(__dirname, "public")));
app.use('/api', app_routes )
app.use('/api/product/' , product_routes )

io.of('/socket-app').on('connection', (socket) => {
    console.log('===========================================')
    console.log('Nueva conección: ' + socket.id )  
    console.log('IP Socket: ' + socket.handshake.address)
    console.log('===========================================')

  socket.emit('psalguero' , { message: 'Mensaje desde el Servidor.' })
})


//  Iniciando el Servidor
try{
    server.listen(PORT, () => {
        console.log('ONLINE PORT :: \x1b[43m%s\x1b[0m' , PORT )
    })
}catch( ex ){
    console.log( "Err >> " + ex )
}



