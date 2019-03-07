const express = require('express');
const router = express.Router();
const checkAuth = require('../middleWar/checkAuth');
const productController = require('../controller/product-controller');

router.post('/shop/:shopId/product',checkAuth ,productController.validationData() ,productController.create_product);

router.put('/shop/:shopId/product/:productId/like',checkAuth , productController.add_like_to_product);

router.get('/shop/:shopId/products',productController.get_all_products);

router.get('/shop/:shopId/products/:productId',productController.get_single_product);

module.exports = router;
