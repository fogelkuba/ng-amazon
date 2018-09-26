const config = require('../config');
const router = require('express').Router();
const algoliasearch = require('algoliasearch');

const {appId, adminApiKey, indexName} = config.algolia;

const client = algoliasearch(appId, adminApiKey);
const index = client.initIndex(indexName);

router.get('/', (req, res, next) => {
    if (req.query.query) {
        index.search({
            query: req.query.query,
            page: req.query.page
        }, (err, content) => {
            res.json({
                success: true,
                message: 'Search Result',
                status: 200,
                content: content,
                search_result: req.query.query
            })
        })
    }
});

module.exports = router;