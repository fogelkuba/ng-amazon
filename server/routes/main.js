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

router.get('/categories/:id', (req, res, next) => {
    const pageSize = 10;
    Product.find({category: req.params.id})
        .populate('category')
        .exec((err, products) => {
            Product.count({category: req.params.id}, (err, totalProducts) => {
                res.json({
                    success: true,
                    message: `category ${req.params.id}`,
                    products,
                    categoryName: products[0].category.name,
                    totalProducts,
                    pages: Math.ceil((totalProducts / pageSize))
                });
            });
        });
});

module.exports = router;