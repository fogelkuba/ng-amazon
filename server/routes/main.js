const router = require('express').Router();
const Category = require('../models/cateogry');

router.route('/categories')
    .get()
    .post((req, res, next) => {
        let category = new Category();
        category.name = req.body.category;
        category.save();
        res.json({
            success: true,
            message: 'Success - Category Post'
        });
    });

module.exports = router;