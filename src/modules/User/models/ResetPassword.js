const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255
    },
    deletedAt: {
        type: Date,
        default: ''
    }
}, {timestamps: true});

module.exports = mongoose.model('ResetPassword', schema);