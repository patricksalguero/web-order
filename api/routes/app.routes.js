const express = require('express')
const app     = express()

//Rutass
app.get("/", (request,response, nextFunct ) => {
    response.status(200).json({
        ok: true,
        message:'Petición realizada correctamente.'
    })
})

module.exports = app