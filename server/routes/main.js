const router = require('express').Router();
const async = require('async');

const Category = require('../models/category');
const Product = require('../models/product');
const Review = require('../models/review');

const checkJWT = require('../middleware/check-jwt');

router.get('/products', (req, res, next) => {
    const pageSize = 10;
    const page = req.query.page;
    async.parallel([
        function (callback) {
            Product.count({}, (err, count) => {
                let totalProducts = count;
                callback(err, totalProducts);
            });
        },
        function(callback) {
            Product.find({})
                .skip(pageSize * page)
                .limit(pageSize)
                .populate('category')
                .populate('owner')
                .exec((err, products) => {
                    if (err) return next(err);
                    callback(err, products);
                });
        },
    ], function(err, results) {
        let totalProducts = results[0];
        let products = results[1];
        res.json({
            success: true,
            message: `All products`,
            products,
            totalProducts,
            pages: Math.ceil((totalProducts / pageSize))
        })
    })
});

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
    async.parallel([
        function (callback) {
            Product.count({category: req.params.id}, (err, count) => {
                let totalProducts = count;
                callback(err, totalProducts);
            });
        },
        function(callback) {
            Product.find({category: req.params.id})
                .skip(pageSize * page)
                .limit(pageSize)
                .populate('category')
                .populate('owner')
                .exec((err, products) => {
                    if (err) return next(err);
                    callback(err, products);
                });
        },
        function(callback) {
            Category.findOne({ _id: req.params.id }, (err, category) => {
               callback(err, category)
            })
        }
    ], function(err, results) {
        let totalProducts = results[0];
        let products = results[1];
        let category = results[2];
        res.json({
            success: true,
            message: `Category: ${category.name} / ${category._id}`,
            products,
            categoryName: category.name,
            totalProducts,
            pages: Math.ceil((totalProducts / pageSize))
        })
    })
});

router.get('/product/:id', (req, res, next) => {
    Product.findById({ _id: req.params.id})
        .populate('category')
        .populate('owner')
        .exec((err, product) => {
            if (err) {
                res.json({
                    success: false,
                    message: `Product with id:${req.params.id} was not found`
                })
            } else {
                res.json({
                    success: true,
                    message: `Found product with id:${req.params.id}`,
                    product
                })
            }
        })
});

router.post('/review', checkJWT, (req, res, next) => {
    async.waterfall([
        function(callback) {
            Product.findOne({ _id: req.body.productId}, (err, product) => {
                if (product) {
                    callback(err, product);
                }
            });
        },
        function(product) {
            let review = new Review();
            review.owner = req.decoded.user._id;

            if (req.body.title) review.title = req.body.title;
            if (req.body.description) review.description = req.body.description;
            review.rating = req.body.rating;

            review.save();
            // product.reviews.push(review._id);
            product.reviews ? product.reviews.push(review._id) : product.reviews = [review._id];
            product.save();
            res.json({
                success: true,
                message: "Successfully added the review"
            });
        }
    ]);
});


module.exports = router;