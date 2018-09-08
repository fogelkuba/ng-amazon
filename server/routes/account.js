const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config');

router.post('/signup', (req, res, next) => {
    // console.log(req.body);
    let user = new User();
    user.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.mail;
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

module.exports = router;