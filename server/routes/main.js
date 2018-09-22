const router = require('express').Router();
const Category = require('../models/category');

router.route('/categories')
    .get((req, res, next) => {
        Category.find({}, (err, categories) => {
            res.json({
                success: true,
                message: 'Success - Category Get',
                categories: categories
            })
        })
    })
    .post((req, res, next) => {
        let category = new Category();
        category.name = req.body.category;
        category.save();
        res.json({
            success: true,
            message: `Category: ${req.body.category} succesfully added`
        });
    });

module.exports = router;