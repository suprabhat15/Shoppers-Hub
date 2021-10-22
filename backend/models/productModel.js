const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required."],
        trim:true
    },
    description: {
        type: String,
        required: [true, "Product description is required."]
    },
    price: {
        type: Number,
        required: [true, "Product Price is required."],
        maxLength: [8, "Price cannot exceed 8 characters."]
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    category: {
        type: String,
        required: [true, "Please enter the category."]
    },
    Stock: {
        type: Number,
        required: [true, "Product Stock is required."],
        maxLength: [4, "Stock cannot exceed 4 characters."],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    review: [{
        name: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Product", productSchema);