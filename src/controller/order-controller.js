const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Product = require('../models/product-model');
const Order = require('../models/order-model');

exports.createOrder = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        if (req.userData.type === "Client") {
            const order = new Order({
                quantity: req.body.quantity,
                product: productId
            })
            let orderDetails = await Order.create(order);
            return res.status(201).json({
                message: "order Maked",
                orderDetails: orderDetails
            });
        }
    }
    catch (err) {
        next(err);
        console.log(err);
        
    }
}

exports.get_all_orders = async(req , res , next)=>{
    try{
        const productId = req.params.productId;
        let getorders = await Order.find({product : productId}).populate('product');
        return res.status(200).json({
            ordersCount : getorders.length,
            orders : getorders
        })
    }
    catch(err){
        next(err);
    }
}

exports.get_single_order = async(req , res , next)=>{
    try{
        const prodId = req.params.productId;
        const orderId = req.params.orderId;
        let getSingleOrder = await Order.findById(orderId).populate('product');
        return res.status(200).json({
            order : getSingleOrder
        })
    }
    catch(err){
        next(err);
    }
}