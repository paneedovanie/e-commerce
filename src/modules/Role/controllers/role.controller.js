const Crud = require(__srcdir + 'core/controllers/core.controller')
const Role = require('../models/Role')

module.exports = new Crud(Role)