const Product = require('../models/Product')

const paginate = require('../utils/pagination')

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
    },
    getPageIfUserLoggedIn: (req, res, next) => {
        if (req.user) paginate(req, res, next)
        else res.render('index')
    },
    searchProductByQuery: (req, res) => {
        if (req.query.q) {
            Product.search({
                query_string: {
                    query: req.query.q
                }
            }, (error, results) => {
                if (error) {
                    let errors     = {}
                    errors.status  = 500
                    errors.message = error

                    res.status(errors.status).json(errors)
                } else {
                    let data = results.hits.hits

                    res.render('search/search-results', {
                        results: data,
                        query: req.query.q
                    })
                }
            })
        }
    },
    instantSearch: (req, res) => {
        Product.search({
            query_string: {
                query: req.body.search_term
            }
        }, (error, result) => {
            if (error) {
                let errors     = {}
                errors.status  = 500
                errors.message = error

                res.status(errors.status).json(errors)
            } else {
                res.json(result)
            }
        })
    }
}