const express = require('express');
const router = express.Router();
const checkAuth = require('../middleWar/checkAuth');
const orderController = require('../controller/order-controller');

router.post('/product/:productId/order',checkAuth,orderController.createOrder);

router.get('/product/:productId/orders', orderController.get_all_orders);

router.get('/product/:productId/orders/:orderId',orderController.get_single_order);
module.exports = router;