const config = require('../config');
const router = require('express').Router();
const Product = require('../models/product');

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const {accessKeyId, secretAccessKey} = config.aws;
const s3 = new aws.S3({accessKeyId, secretAccessKey});

const checkJWT = require('../middleware/check-jwt');

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'angular-amazono',
        metadata: function (req, file, cb) {
            cb(null, {fieldname: file.fieldname})
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
});

router.route('/products')
    .get()
    .post([checkJWT, upload.single('product_picture')], (req, res, next) => {
        let product = new Product();

        product.owner = req.decoded.user_id;
        product.category = req.body.categoryId;
        product.title = req.body.title;
        product.price = req.body.price;
        product.description = req.body;
        product.image = req.file.location;

        product.save();
        
        res.json({
            success: true,
            message: 'Product added'
        })
    });

module.exports = router;