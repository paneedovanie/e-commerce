const mongoose = require('mongoose');
const SoftDelete = require( `${ __srcdir }core/models/fields/SoftDelete` )

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
    ...SoftDelete,
}, {timestamps: true});

module.exports = mongoose.model('Permission', schema);