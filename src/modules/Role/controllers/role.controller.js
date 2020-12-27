const Crud = require(__srcdir + 'core/controllers/core.controller')
const Role = require('../models/Role')

class RoleController extends Crud {
  constructor(model) {
    super(model)
  }
}

module.exports = new RoleController(Role)