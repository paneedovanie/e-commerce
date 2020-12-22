const Crud = require(__srcdir + 'core/controllers/core.controller')
const RolePermission = require(`${ __srcdir }modules/Role/models/RolePermission`)

module.exports = new Crud(RolePermission)