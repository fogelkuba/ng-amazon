const router = require('express').Router();
const Category = require('../models/category');
const Product = require('../models/product');


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
    const page = req.query.page;

    async.waterfall([
        function (callback) {
            Product.count({category: req.params.id}, (err, count) => {
                let totalProducts = count;
                callback(err, totalProducts);
            });
        },
        function(totalProducts, callback) {
            Product.find({category: req.params.id})
                .skip(pageSize * page)
                .limit(pageSize)
                .populate('category')
                .populate('owner')
                .exec((err, products) => {
                    if (err) return next(err);
                    callback(err, products, totalProducts);
                });
        },
        function(products, totalProducts, callback) {
            Category.findOne({ _id: req.params.id }, (err, category) => {
                res.json({
                    success: true,
                    message: `category: ${category.name} / ${_id}`,
                    products,
                    categoryName: products[0].category.name,
                    totalProducts,
                    pages: Math.ceil((totalProducts / pageSize))
                })
            })
        }
    ])

    // Product.find({category: req.params.id})
    //     .populate('category')
    //     .exec((err, products) => {
    //         Product.count({category: req.params.id}, (err, totalProducts) => {
    //             res.json({
    //                 success: true,
    //                 message: `category: ${products[0].category.name} / ${req.params.id}`,
    //                 products,
    //                 categoryName: products[0].category.name,
    //                 totalProducts,
    //                 pages: Math.ceil((totalProducts / pageSize))
    //             });
    //         });
    //     });
});

module.exports = router;