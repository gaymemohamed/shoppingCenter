const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Category = require('../models/category-model');
const User = require('../models/user-model');


exports.createCat = async(req , res , next)=>{
    let checkCat = await Category.findOne({name:req.body.name});
    if(checkCat){
        return res.status(409).json({
            message : "Category Exist in db"
        })
    }else{

    
    if(req.userData.type === "Admin"){
        const category = new Category({
            name : req.body.name
        })
        let createCat = await Category.create(category);
        return res.status(200).json({
            message : "category Created",
        })
    }else{
        return res.status(403).json({
            message:"You are not Admin"
        });
    }
}
};

exports.get_all_cats = async(req , res , next)=>{
    try{
        let getAllCats = await Category.find({}).sort({creationDate : -1});
        return res.status(200).json({
            Category_Count : getAllCats.length,
            categories : getAllCats
        })
    }
    catch(err){
        next(err);
    }
}

exports.get_single_cat = async(req , res , next)=>{
    try{
        const id = req.params.categoryId;
        let catDeatail = await User.findById(id);
        return res.status(200).json({
            categoryDeatail : catDeatail
        });
    }
    catch(err){
        next(err);
    }
}