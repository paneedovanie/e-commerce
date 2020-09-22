const mongoose = require('mongoose');

const schema = mongoose.Schema({
    code: {
        type: String,
        required: true,
        max: 255
    },
    description: {
        type: String,
        required: true,
        max: 255
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    deletedAt: {
        type: Date,
        default: ''
    }
}, {timestamps: true});

module.exports = mongoose.model('Permission', schema);