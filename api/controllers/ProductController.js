const Product = require('../models/Product')
const fs = require('fs')

const getListProducts = ( request , response , nextFunction ) => {
    let since = request.query.since || 0
    since = Number( since )

    Product.find({})
        .skip( since )
        .limit( 10 )
        .sort({ updateAt: 'desc' , createAt:'desc'})
        .exec((err, products) => {
            if( err ) {
                return response.status(500).json({
                    ok : false , 
                    message: 'Ha ocurrido un error al listar productos',
                    errors : err
                })
            }

            Product.count({}, (erroC, count) => {
                return response.status(200).json({
                    ok : true ,
                    products: products,
                    total: count
                })
            })
        })
}

const getProductById = ( request , response , nextFunction ) => {
    const id = request.params.id
    
    if( id == null || !id ) {
        return response.status(400).json({
            ok : false ,
            message : 'El id del Producto es obligatorio'
        })
    }

    Product.findById( id , (err , prd ) => {
        if( err ){
            return response.status(500).json({
                ok : false ,
                message: 'Ha ocurrido un error al buscar producto.',
                errors : err
            })
        }

        if( !prd || prd == null ) {
            return response.status(404).json({
                ok : false ,
                message: 'Error al encontrar producto ' + id 
            })
        }

        return response.status(200).json({
            ok : true ,
            message: 'Producto encontrado',
            product: prd
        })
    })
    

}

const saveProduct = ( request , response , nextFunction ) => {
    const body = request.body

    const product = new Product({
        name : body.name,
        description: body.description,
        unity : body.unity,
        price : body.price,
        price_u : body.price_u,
        img: body.img,
        createAt : body.createAt,
        updateAt: body.updateAt
    })

    product.save( (err, p ) => {
        if( err ) {
            return response.status(500).json({
                ok : false ,
                message : 'Ha ocurrido un error al registrar producto',
                errors: err
            })
        }

        global.io.of('/socket-app')
            .emit('product-save', { message: 'Se ha registrado un nuevo producto'})

        return response.status(200).json({
            ok : true ,
            message: 'Producto registrado correctamente.',
            product: p
        })

    })

}

const updateProductById = ( request , response , nextFunction ) => {
    const body = request.body
    const id = request.params.id

    if( id == null || !id ) {
        return response.status(400).json({
            ok : false ,
            message : 'El id del Producto es obligatorio'
        })
    }

    Product.findById( id , (err , prd ) => {
        if( err ) {
            return response.status(500).json({
                ok : false ,
                message: 'Ocurrió un error al buscar producto',
                errors : err
            })
        }

        if( !prd ){
            return response.status(404).json({
                ok: false ,
                message: 'El producto con id ' + id +' no existe',
                errors: { message: 'No existe Producto'}
            })
        }

        prd.name = body.name
        prd.description = body.description
        prd.unity = body.unity
        prd.prd = body.price
        prd.prd_u = body.price_u
        prd.updateAt = new Date()

        prd.save( (errS , prdS) => {
            if( errS ) {
                return response.status(500).json({
                    ok : false ,
                    message: 'Ocurrió un error al actualizar producto',
                    errors : err
                })
            }

            return response.status(200).json({
                ok : true ,
                message: 'Producto actualizado correctamente',
                product: prdS
            })

        })


    })

}

const deleteProductoById = ( request , response , nextFunction ) => {
    const id = request.params.id

    if( id == null || !id ) {
        return response.status(400).json({
            ok : false ,
            message : 'El id del Producto es obligatorio'
        })
    }

    Product.findByIdAndRemove( id , (err , product ) => {
        if( err ) {
            return response.status(500).json({
                ok: false ,
                message: 'Error al eliminar producto',
                errors: err
            })
        }

        if( !product || product == null ) {
            return response.status(404).json({
                ok : false ,
                message: 'Producto con ID ' + id + ' no encontrado.'
            })
        }

        return response.status(200).json({
            ok  :true,
            message : 'Producto ' + id + ' eliminado correctamente.',
            product: product
        })

    })


}

module.exports = {
    getListProducts,
    getProductById,
    saveProduct,
    updateProductById,
    deleteProductoById
}
