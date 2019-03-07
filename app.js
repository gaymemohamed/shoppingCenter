const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const userRoute = require('./src/routes/user-route');
const categoryRoute = require('./src/routes/category-route');
const shopRoute = require('./src/routes/shop-route');
const productRoute = require('./src/routes/product-route');
const orderRoute = require('./src/routes/order-route');
const favouriteListRoute = require('./src/routes/foavouriteList-route');
const app = express();

mongoose.connect('mongodb://shopper:0108444641g@ds033699.mlab.com:33699/shopping-center', { useNewUrlParser: true }, () => {
    console.log("db is running now ...");
});
app.use('/uploads', express.static('uploads'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.use('/', favouriteListRoute);
app.use('/', orderRoute);
app.use('/', productRoute);
app.use('/', shopRoute);
app.use('/', userRoute);
app.use('/', categoryRoute);
app.use(expressValidator());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});




app.use((req, res, next) => {
    const error = new Error('not found !');
    error.status(404);
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;