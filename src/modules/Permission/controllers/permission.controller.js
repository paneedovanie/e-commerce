const Crud = require(__srcdir + 'core/controllers/core.controller')
const Permission = require('../models/Permission')

module.exports = new Crud(Permission)