const ApiController = require(__srcdir + 'core/controllers/api/api.controller')
const RolePermission = require(`${ __srcdir }modules/Role/models/RolePermission`)

class RolePermissionController extends ApiController {
	constructor (props) {
		super(props)
	}
}

module.exports = new RolePermissionController(RolePermission)