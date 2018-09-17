const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config');
const checkJWT = require('../middleware/check-jwt');

router.post('/signup', (req, res, next) => {
    let user = new User();
    user.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;
    user.picture = user.gravatar();
    user.isSeller = req.body.isSeller;

    User.findOne({email: req.body.email}, (err, existingUser) => {
        if (existingUser) {
            res.json({
                success: false,
                message: 'Account with this mail already exists'
            })
        } else {
            user.save();
            let token = jwt.sign({
                user: user
            }, config.secret, {
                expiresIn: '7d'
            });
            res.json({
                success: true,
                message: 'Token granted',
                token: token
            })
        }
    })
});

router.post('/login', (req, res, next) => {
    User.findOne({email: req.body.email}, (err, user) => {

        if (err) {
            throw err;
        }

        if (!user) {
            res.json({
                success: false,
                message: 'Authentication failed - User not found :('
            });

        } else if (user) {
            let validPassword = user.comparePasswords(req.body.password);
            if (!validPassword) {
                res.json({
                    success: false,
                    message: 'Authentication failed - Wrong password.'
                });

            } else {
                let token = jwt.sign({
                    user: user
                }, config.secret, {
                    expiresIn: '7d'
                });
                res.json({
                    success: true,
                    message: 'Token granted',
                    token: token
                })
            }
        }
    })
});

router.route('/profile')
    .get(checkJWT, (req, res, next) => {
        User.findOne({ _id: req.decoded.user._id}, (err, user) => {
            res.json({
                success: true,
                user: user,
                message: 'Profile found'
            });
        });
    })
    .post(checkJWT, (req, res, next) => {
        User.findOne({_id: req.decoded.user._id}, (err, user) => {
            if (err) return next(err);
            if (req.body.name) user.name = req.body.name;
            if (req.body.email) user.email = req.body.email;
            if (req.body.password) user.password = req.body.password;
            user.isSeller = req.body.isSeller;

            console.log(req.body);
            if (Object.keys(req.body).length) {
                user.save();
                res.json({
                    success: true,
                    message: 'User profile edited'
                })
            } else {
                res.json({
                    success: true,
                    message: 'No changes to submit'
                })
            }

        })
    });

router.route('/adress')
    .get(checkJWT, (req, res, next) => {
        User.findOne({ _id: req.decoded.user._id}, (err, user) => {
            res.json({
                success: true,
                adress: user.adress,
                message: 'Profile found'
            });
        });
    })
    .post(checkJWT, (req, res, next) => {
        User.findOne({_id: req.decoded.user._id}, (err, user) => {
            if (err) return next(err);

            if (req.body.adress1) user.adress.adress1 = req.body.adress1;
            if (req.body.adress2) user.adress.adress2 = req.body.adress2;
            if (req.body.city) user.adress.city = req.body.city;
            if (req.body.state) user.adress.state = req.body.state;
            if (req.body.country) user.adress.country = req.body.country;
            if (req.body.postalCode) user.adress.postalCode = req.body.postalCode;

            if (Object.keys(req.body).length) {
                user.save();
                res.json({
                    success: true,
                    message: 'User adress edited'
                })
            } else {
                res.json({
                    success: true,
                    message: 'No changes to submit'
                })
            }

        })
    });

module.exports = router;