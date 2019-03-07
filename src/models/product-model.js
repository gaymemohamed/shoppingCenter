const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shop'
    },
    creationDate:{
        type : Date,
        default: new Date
    },
    likeCount:{
        type : Number,
        default:0
    }
})

module.exports = mongoose.model('product',productSchema);