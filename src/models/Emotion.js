const mongoose = require('mongoose');

const schema = mongoose.Schema({
    phrase: {
        type: String,
        required: true,
        max: 255
    },
    category: {
        type: String,
        required: true,
        max: 255
    },
    deletedAt: {
        type: Date,
        default: ''
    }
}, {timestamps: true});

module.exports = mongoose.model('Emotion', schema);