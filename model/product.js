const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String},
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    ratings: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
})

const product= mongoose.model('product',productSchema)

module.exports=product