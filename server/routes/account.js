const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
    // console.log(req.body);
    let user = new User();
    user.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.mail;
    user.picture = user.gravatar();
    user.isSeller = req.body.isSeller;

    User.findOne({email: req.body.email}, (err,user) => {
        if (user) {
            res.json({
                success: false,
                message: 'Account with this mail already exists'
            })
        } else {
            user.save();
        }
    })
});

module.exports = router;