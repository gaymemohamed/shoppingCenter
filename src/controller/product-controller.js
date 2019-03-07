const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Product = require('../models/product-model');
const Shop = require('../models/shop-model');
const User = require('../models/user-model');
const FavouriteList = require('../models/favouriteList-model');
const {check, validationResult} = require('express-validator/check');
exports.validationData = ()=>{
    return[
        check('name').exists().withMessage('name is required'),
        check('price').exists().withMessage('price is required')
    ]
}

exports.create_product = async (req, res, next) => {
    try {
        console.log("dddd");
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        console.log("ddd");
        const shopId = req.params.shopId;
        if (req.userData.type === "Provider") {
            const product = new Product({
                name: req.body.name,
                price: req.body.price,
                shop: shopId,
            })
            let productDetail = await Product.create(product);
            return res.status(201).json({
                message: "product Created",
                productDetail: productDetail
            })

        }
    }
    catch (err) {
        console.log(err);
        next(err);

    }
}

exports.add_like_to_product = async (req, res, next) => {
    try {
        const userId = req.userData.userId;
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        if (req.userData.type === "Client") {
            product.likeCount += 1;
            let favouriteList = await FavouriteList.findOne({ user: userId });
            if (favouriteList) {
                let arrOfProducts = favouriteList.products;
                for(let i = 0 ; i < arrOfProducts.length ; i++){
                    console.log(arrOfProducts[i]);
                    console.log(productId);
                    if (arrOfProducts[i] == productId) {
                        return res.status(422).json({ message: 'you have this product on your fav list' });
                    }
                    else {
                        favouriteList.products.push(productId);
                        await favouriteList.save();
                    }
                    return res.status(200).json({
                        product : product,
                        favouriteList : favouriteList
            
                    })
                }
            } else {
                req.body.user = userId;
                let arr = [];
                arr.push(productId);
                req.body.products = arr;
                let createFavouritList = await FavouriteList.create(req.body);
                return res.status(200).json({
                    product : product,
                    favouriteList : createFavouritList
                })

            }

        }
     
    }
    catch (err) {
        console.log(err);

        next(err);
    }
}

exports.get_all_products = async (req, res, next) => {
    try {
        const shopId = req.params.shopId;
        let getProducts = await Product.find({ shop: shopId }).populate('shop');
        return res.status(200).json({
            productsCount: getProducts.length,
            products: getProducts
        })
    }
    catch (err) {
        next(err);
    }
}

exports.get_single_product = async (req, res, next) => {
    try {
        const prodId = req.params.productId;
        const shopId = req.params.shopId;
        let getSingleProduct = await Product.findById(prodId).populate('shop');
        return res.status(200).json({
            product: getSingleProduct
        })
    }
    catch (err) {
        next(err);
    }
}