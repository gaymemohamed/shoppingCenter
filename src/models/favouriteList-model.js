const mongoose = require('mongoose');
const favouriteListSchema = mongoose.Schema({
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref :"product"
    }]
});

module.exports = mongoose.model('favouriteList', favouriteListSchema);