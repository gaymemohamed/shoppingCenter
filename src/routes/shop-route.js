const express = require('express');
const router = express.Router();
const checkAuth = require('../middleWar/checkAuth');
const shopController = require('../controller/shop-controller');

router.post('/category/:categoryId/shop',checkAuth ,shopController.createShop);

router.get('/category/:categoryId/shops', shopController.get_all_shops);

router.get('/category/:categoryId/shops/:shopId', shopController.get_single_shop);
module.exports = router;