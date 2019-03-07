const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    quantity :{
        type : Number,
        required : true
    },
    product : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }
});

module.exports = mongoose.model('order', orderSchema);