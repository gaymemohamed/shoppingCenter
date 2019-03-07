const express = require('express');
const router = express.Router();
const checkAuth = require('../middleWar/checkAuth');
const favouriteListController = require('../controller/favouriteList-controller');

router.get('/favouriteList', checkAuth ,favouriteListController.get_single_favouriteList);

module.exports = router;