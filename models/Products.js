const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique: true
    },
    content : {
        type : String,
        required : true
    },
    category:{
        type:String,
        required:true
    },
    originalPrice : {
        type: Number,
        required:true
    },
    discountedPrice: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Product',productSchema);