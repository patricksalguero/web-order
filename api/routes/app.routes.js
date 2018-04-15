const express = require('express')
const app     = express()

//Rutass
app.get("/", (request,response, nextFunct ) => {
    response.status(200).json({
        ok: true,
        message:'Petición realizada correctamente.'
    })
})

app.get("/test-save", (req, res , nex ) => {

    global.io.of('/socket-app').emit('test-save', { message: 'Se ha registrado nuevo mensaje desde el test'})
    
    res.status(200).json({
        ok : true ,
        message: 'Mensaje desde el test-save'
    })
})

module.exports = app