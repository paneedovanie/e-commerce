const mongoose = require('mongoose');

const schema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    quote_id: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    originator: {
        type: Object,
        required: true
    },
    tags: {
        type: Array
    },
    url: {
        type: String,
        required: true
    },
    deletedAt: {
        type: Date,
        default: ''
    }
}, {timestamps: true});

module.exports = mongoose.model('Quote', schema);