const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user-model');
const { check, validationResult } = require('express-validator/check');

exports.DataValidation = () => {
    return [
        check('email').isEmail().withMessage("you enter unvailed email"),
        check('password').isLength({ min: 5 }).withMessage("less than 5 chars")
    ]
}


exports.user_signup = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let checkMail = await User.findOne({ email: req.body.email });
        if (checkMail) {
            return res.status(409).json({
                message: "Email is Exist"
            })
        }

        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: err
                });
            }
            else {

                const user = new User({
                    name: req.body.name,
                    type: req.body.type,
                    email: req.body.email,
                    password: hash,
                })
                let createUser = await User.create(user);
                return res.status(201).json({
                    message: "user Created",
                    userDetials: createUser
                })
            }
        })
    }
    catch (err) {
        next(err);
    }
};

exports.user_login = async (req, res, next) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({
                message: "Email or password is wrong"
            });
        }
        bcrypt.compare(req.body.password, user.password, (err, restult) => {
            if (err) {
                return res.status(401).json({
                    message: "Auth Failed"
                })
            }
            if (restult) {
                const token = jwt.sign({
                    email: user.email,
                    userId: user.id,
                    type: user.type
                },
                    'secret'
                    , {
                        expiresIn: "1h"
                    }
                );
                return res.status(200).json({
                    message: "Auth Success",
                    token: token
                })
            }
            else {
                return res.status(401).json({
                    message: "Auth Failed"
                })
            }
        })
    }
    catch (err) {
        next(err);
    }
};

exports.get_all_users = async (req, res, next) => {
    try {
        let getUsers = await User.find({}).sort({ creationDate: -1 });
        return res.status(200).json({
            numberOfUsers: getUsers.length,
            Users: getUsers.map(getUsers => {
                return {
                    id: getUsers.id,
                    name: getUsers.name,
                    email: getUsers.email,
                    type: getUsers.type,
                }
            })
        })
    }
    catch (err) {
        next(err);
    }
}
