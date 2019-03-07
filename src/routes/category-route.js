const express = require('express');
const router = express.Router();
const checkAuth = require('../middleWar/checkAuth');
const multer = require('multer');
const categoryController = require('../controller/category-controller');
const storage = multer.diskStorage({
    destination : (req , file , cb)=>{
        cb(null , './uploads/');
    },
    filename: (req , file , cb)=>{
        cb(null , file.filename+ '-' + Date.now())
    }
    
 })
 const upload = multer({storage : storage});
router.post('/category',checkAuth , upload.single('categoryImg') ,categoryController.createCat);

router.get('/categories', categoryController.get_all_cats);

router.get('/:categoryId' , categoryController.get_single_cat);
module.exports = router;