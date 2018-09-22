const router = require('express').Router();
const Product = require('../models/product');
const config = require('../config');

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const {accessKeyId, secretAccessKey} = config.aws;

const s3 = new aws.S3({accessKeyId, secretAccessKey});