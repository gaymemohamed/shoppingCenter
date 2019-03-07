const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Category = require('../models/category-model');
const Shop = require('../models/shop-model');
const User = require('../models/user-model');

exports.createShop = async (req, res, next) => {
    try {
        const categoryId = req.params.categoryId;
        const userId = req.userData.userId;
        if (req.userData.type === "Provider") {
            const shop = new Shop({
                name: req.body.name,
                category : categoryId,
                user : userId
            });
            let shopDetail = await Shop.create(shop);
            return res.status(200).json({
                message: "Shop Created",
                shop : shop
            });
        } else {
            return res.status(401).json({
                message: "you are not Provider"
            })
        }
    }
    catch (err) {
        next(err);
    }
}

exports.get_all_shops = async (req, res, next) => {
    try {
        let getShops = await Shop.find({category : req.params.categoryId}).populate('user').populate('category');
        return res.status(200).json({
            shopsCount: getShops.length,
            Shops: getShops
        })
    }
    catch (err) {
        next(err);
    }
}

exports.get_single_shop = async (req , res , next)=>{
    try{
        const shopId = req.params.shopId;
        let getSingleShop = await Shop.findById(shopId).populate('user').populate('category');
        return res.status(200).json({
            Shop : getSingleShop
        })
    }
    catch(err){
        next(err);
    }
}