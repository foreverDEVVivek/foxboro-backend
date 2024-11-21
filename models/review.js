const {Schema,model} = require('mongoose');

//Review Schema
const reviewSchema = new Schema({
    author: {
        type: String,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

const Review= model('Review',reviewSchema);

module.exports = Review;