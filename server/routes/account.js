const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
    // console.log(req.body);
    let user = new User();
    user.name = req.body.name;
    user.password = req.body.password;
    user.mail = req.body.mail;
});

module.exports = router;