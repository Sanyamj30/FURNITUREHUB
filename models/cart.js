// backend/models/Product.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    items:[
        {
            id:{type:Number},
            quantity:{type:Number},
            price:{type:Number},
        }
    ],
    userId:{type:String},
    total:{type:Number},
    date:{type:Date},
    ordered:{type:Boolean}
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
