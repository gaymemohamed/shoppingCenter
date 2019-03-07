const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Product = require('../models/product-model');
const User = require('../models/user-model');
const FavouriteList = require('../models/favouriteList-model');

exports.get_single_favouriteList = async(req , res , next)=>{
    try{
        const userId = req.userData.userId;
        if(req.userData.type === "Client"){
            let getSingleFavouriteList = await FavouriteList.findOne({user : userId}).populate('user').populate('products');
            return res.status(200).json({
                favouriteList : getSingleFavouriteList
            })        
        }
    }
    catch(err){
        next(err);
    }
}