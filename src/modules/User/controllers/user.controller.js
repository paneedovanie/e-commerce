const Crud = require(__srcdir + 'core/controllers/core.controller')
const User = require('../models/User')
const showFields = ['_id', 'firstName', 'lastName', 'email', 'role', 'username', 'verified', 'createdAt', 'updatedAt', 'deletedAt']

module.exports = new Crud(User)