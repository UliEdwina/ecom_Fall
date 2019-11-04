const mongoose = require('mongoose')
const mongoosastic = require('mongoosastic')

const ProductSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        es_type: 'nested',
        es_include_in_parent: true
    },
    name:  { type: String, es_type: 'text', default: '' },
    price: { type: Number, es_type: 'long', default: 0  },
    image: { type: String, es_type: 'text', default: '' }
})

ProductSchema.plugin(mongoosastic, {
    hosts: [
        'localhost:9200'
    ],
    populate: [
        {
            path: 'category'
        }
    ]
})
console.log(ProductSchema)

module.exports = mongoose.model('product', ProductSchema)