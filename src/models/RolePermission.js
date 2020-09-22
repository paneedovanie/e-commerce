const mongoose = require('mongoose');

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
    deletedAt: {
        type: Date,
        default: ''
    }
}, {timestamps: true});

module.exports = mongoose.model('RolePermission', schema);