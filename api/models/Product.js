const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name : { type: String , required: [ true, 'El nombre del producto es obligatorio'] , maxlength: 40},
    description : { type:String , required: false , maxlength: 80 },
    unity : { type: String , required : false , default: 'UND'},
    price: { type: Number , required: [true,'El precio del producto es obligatorio']},
    price_u : { type: Number , required: [true ,'El precio unitario es obligatorio']},
    img: { type: String , require : false },
    createAt: { type: Date , required: true , default: new Date() },
    updateAt: { type: Date , required: false }
})

module.exports = mongoose.model('Product', productSchema )