const mongoose = require('mongoose');
const Owner = require( `${ __srcdir }core/models/fields/Owner` );
const SoftDelete = require( `${ __srcdir }core/models/fields/SoftDelete` )

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
        default: null
    },
    ...SoftDelete,
    ...Owner
}, {timestamps: true});

module.exports = mongoose.model('Category', schema);