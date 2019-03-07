const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name:{
        type : String,
        required: true
    },
    creationDate:{
        type : Date,
        default: new Date
    }
});

module.exports = mongoose.model('category', categorySchema);
