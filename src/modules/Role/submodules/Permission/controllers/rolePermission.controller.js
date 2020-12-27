const Crud = require(__srcdir + 'core/controllers/core.controller')
const RolePermission = require(`${ __srcdir }modules/Role/models/RolePermission`)

class RolePermissionController extends Crud {
  constructor(model, showFields, populate) {
    super(model, showFields, populate)
  }
}

module.exports = new RolePermissionController(RolePermission, null, 'role permission') 