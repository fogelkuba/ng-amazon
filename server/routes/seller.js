const config = require('../config');
const router = require('express').Router();
const Product = require('../models/product');

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
// Fake test-data Generator
const faker = require('faker');

const {accessKeyId, secretAccessKey} = config.aws;
const s3 = new aws.S3({accessKeyId, secretAccessKey});



const checkJWT = require('../middleware/check-jwt');

const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'angular-amazono',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname})
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
});

router.route('/products')
    .get(checkJWT, (req, res, next) => {
        Product.find({owner: req.decoded.user._id})
            .populate('owner')
            .populate('category')
            .exec((err, products) => {
                if (products) {
                    res.json({
                        success: true,
                        message: 'Products Fetched',
                        products: products
                    });
                }
            })
    })
    .post([checkJWT, upload.single('product_picture')], (req, res, next) => {
        let product = new Product();

        product.owner = req.decoded.user._id;
        product.category = req.body.categoryId;
        product.title = req.body.title;
        product.price = req.body.price;
        product.description = req.body.description;
        product.image = req.file.location;

        product.save();

        res.json({
            success: true,
            message: 'Product added'
        })
    });

// Fake test-data Generator
router.route('/faker/generate')
    .get((req, res, next) => {
    const count = 20;
    for (i = 0; i < count; i++) {
        let product = new Product();
        product.owner = '5b9ff7833c9bbdc041fbd1c8';
        product.category = '5ba658dafe24e44581886641';
        product.title = faker.commerce.productName();
        product.price = faker.commerce.price();
        product.description = faker.lorem.paragraph();
        product.image = faker.image.technics();
        product.save();
    }

    res.json({
        message: 'Successfully faked ' + count + ' products'
    });
});

module.exports = router;