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
        s3,
        bucket: 'angular-amazono',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldName})
        },
        key: function (req, file, cb) {
            cb(null, {fieldName: file.fieldName})
        }
    })
});

router.route('/products')
    .get()
    .post()

module.exports = router;