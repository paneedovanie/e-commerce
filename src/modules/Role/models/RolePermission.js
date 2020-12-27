const mongoose = require('mongoose');
const Owner = require( `${ __srcdir }core/models/fields/Owner` );
const SoftDelete = require( `${ __srcdir }core/models/fields/SoftDelete` )

const schema = mongoose.Schema({
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true,
    },
    permission: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
        required: true,
    },
    ...SoftDelete,
    ...Owner
}, {timestamps: true});

module.exports = mongoose.model('RolePermission', schema);