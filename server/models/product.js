const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../config');

const deepPopulate = require('mongoose-deep-populate')(mongoose);
const mongooseAlgolia = require('mongoose-algolia');

const ProductSchema = new Schema({

    category: { type: Schema.Types.ObjectId, ref: 'Category'},
    owner:  { type: Schema.Types.ObjectId, ref: 'User'},
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review'}],
    image: String,
    title: String,
    description: String,
    price: Number,
    crated: { type: Date, default: Date.now }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

ProductSchema
    .virtual('averageRating')
    .get(function() {
        var rating = 0;
        if (this.reviews.length == 0) {
            rating = 0;
        } else {
            this.reviews.map((review) => {
                rating += review.rating;
            });
            rating = rating / this.reviews.length;
        }

        return rating;
    });

const {appId, adminApiKey, indexName} = config.algolia;

ProductSchema.plugin(deepPopulate);
ProductSchema.plugin(mongooseAlgolia, {
    appId: appId,
    apiKey: adminApiKey,
    indexName: indexName,
    selector: '',
    populate: {
        path: 'owner reviews',
        select: 'name rating'
    },
    default: {

    },
    mappings: {

    },
    virtuals: {

    }

});

module.exports = mongoose.model('Product', ProductSchema);