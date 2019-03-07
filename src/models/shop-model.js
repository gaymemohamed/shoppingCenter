const mongoose = require('mongoose');

const shopSchema = mongoose.Schema({
    name:{
        type : String,
        required:true
    },
    category : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'category'
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    creationDate:{
        type : Date,
        default: new Date
    }
})

module.exports = mongoose.model('shop', shopSchema);
