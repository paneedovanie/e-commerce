const mongoose = require('mongoose');
const Owner = require( `${ __srcdir }core/models/fields/Owner` );
const SoftDelete = require( `${ __srcdir }core/models/fields/SoftDelete` )

const schema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        max: 255
    },
    middleName: {
        type: String,
        max: 255
    },
    lastName: {
        type: String,
        required: true,
        max: 255
    },
    username: {
        type: String,
        required: true,
        unique: true,
        max: 255
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 255
    },
    password: {
        type: String,
        required: true,
        max: 1024
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    ...SoftDelete,
    ...Owner
}, {timestamps: true})

module.exports = mongoose.model('User', schema);