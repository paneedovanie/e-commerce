const mongoose = require('mongoose');
const Owner = require( `${ __srcdir }core/models/fields/Owner` );
const SoftDelete = require( `${ __srcdir }core/models/fields/SoftDelete` )

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique : true,
        max: 255
    },
    ...SoftDelete,
    ...Owner
}, {timestamps: true});

module.exports = mongoose.model('Role', schema);