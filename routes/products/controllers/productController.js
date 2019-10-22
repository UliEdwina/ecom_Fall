const Product = require('../models/Product')

module.exports = {
    getAllProducts: (params) => {
        return new Promise((resolve, reject) => {
            Product.find(params)
                    .populate('category')
                    .exec()
                    .then(products => {
                        resolve(products)
                    })
                    .catch(err => {
                        let errors     = {}
                        errors.status  = 500
                        errors.message = err

                        reject(errors)
                    })
        })
    },
    getProductByID: (id) => {
        return new Promise((resolve, reject) => {
            Product.findById(id)
                .then(product => {
                    resolve(product)
                })
                .catch(err => {
                    let errors     = {}
                    errors.status  = 500
                    errors.message = err

                    reject(errors)
                })
        })
    },
    getProductsByCategoryID: (id) => {
        return new Promise((resolve, reject) => {
            Product.find({ category: id })
                    .populate('category')
                    .exec()
                    .then(products => {
                        resolve(products)
                    })
                    .catch(err => {
                        let errors     = {}
                        errors.status  = 500
                        errors.message = err

                        reject(errors)
                    })
        })
    }
}