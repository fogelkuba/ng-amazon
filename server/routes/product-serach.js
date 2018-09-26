const config = require('../config');
const router = require('express').Router();
const algoliasearch = require('algoliasearch');

const {appId, adminApiKey, indexName} = config.algolia;

const client = algoliasearch( appId, adminApiKey);
const index = client.initIndex(indexName);