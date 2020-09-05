const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255
    },
    type: {
        type: String,
        required: true,
        max: 255
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    deletedAt: {
        type: Date,
        default: ''
    }
}, {timestamps: true});

module.exports = mongoose.model('Category', schema);