const express = require('express')
const app = express()

const productCtrl = require('../controllers/ProductController')

app.get('/', productCtrl.getListProducts )

app.get('/:id' , productCtrl.getProductById )

app.post('/', productCtrl.saveProduct )

app.put('/:id', productCtrl.updateProductById)

app.delete('/:id', productCtrl.deleteProductoById )

module.exports = app